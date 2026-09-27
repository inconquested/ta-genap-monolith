import { useCallback, useEffect, useRef } from 'react';

interface DragScrollOptions {
    /** px of pointer travel before a press becomes a drag (click-suppression threshold). */
    threshold?: number;
    /** per-frame velocity retention for momentum decay (0-1). */
    decay?: number;
    /** show mask-image edge fades where overflow remains. */
    fades?: boolean;
}

interface DragPoint {
    x: number;
    t: number;
}

const FADE_PX = 28;
const MIN_VELOCITY = 0.12; // px per ms, below this momentum stops

function updateFades(el: HTMLElement) {
    const max = el.scrollWidth - el.clientWidth - 1;
    const left = el.scrollLeft > 1;
    const right = el.scrollLeft < max;
    if (!left && !right) {
        el.style.maskImage = 'none';
        (el.style as any).webkitMaskImage = 'none';
        return;
    }
    const from = left ? 'transparent 0' : 'black 0';
    const to = right ? 'transparent 100%' : 'black 100%';
    const value = `linear-gradient(to right, ${from}, black ${FADE_PX}px, black calc(100% - ${FADE_PX}px), ${to})`;
    el.style.maskImage = value;
    (el.style as any).webkitMaskImage = value;
}

/**
 * Tactile horizontal scrolling: pointer-drag with inertia, click-vs-drag
 * disambiguation, and optional edge fades. Touch scrolling stays fully
 * native (only mouse/pen get drag handling); keyboard scrolling, focus,
 * and assistive tech are untouched. Reduced-motion users get direct
 * dragging with zero momentum.
 */
export function useDragScroll<T extends HTMLElement>(options?: DragScrollOptions) {
    const { threshold = 6, decay = 0.94, fades = false } = options ?? {};
    const ref = useRef<T | null>(null);
    const drag = useRef({
        down: false,
        startX: 0,
        startScroll: 0,
        moved: false,
        suppressClick: false,
        samples: [] as DragPoint[],
        raf: 0,
    });

    const stopMomentum = useCallback(() => {
        cancelAnimationFrame(drag.current.raf);
        drag.current.raf = 0;
    }, []);

    const refreshFades = useCallback(() => {
        const el = ref.current;
        if (el && fades) updateFades(el);
    }, [fades]);

    useEffect(() => {
        refreshFades();
        window.addEventListener('resize', refreshFades);
        const el = ref.current;
        const ro =
            typeof ResizeObserver !== 'undefined' && el
                ? new ResizeObserver(refreshFades)
                : null;
        if (el && ro) ro.observe(el);
        return () => {
            window.removeEventListener('resize', refreshFades);
            ro?.disconnect();
            cancelAnimationFrame(drag.current.raf);
        };
    }, [refreshFades]);

    const onPointerDown = useCallback(
        (e: React.PointerEvent<T>) => {
            // Touch stays native; only enhance mouse/pen.
            if (e.pointerType === 'touch' || e.button !== 0) return;
            if (e.isPrimary === false || drag.current.down) return;
            const el = ref.current;
            if (!el) return;
            stopMomentum();
            const s = drag.current;
            s.down = true;
            s.moved = false;
            s.suppressClick = false;
            s.startX = e.clientX;
            s.startScroll = el.scrollLeft;
            s.samples = [{ x: e.clientX, t: performance.now() }];
            try {
                el.setPointerCapture?.(e.pointerId);
            } catch {
                /* capture unavailable */
            }
        },
        [stopMomentum],
    );

    const endDrag = useCallback(
        (e: React.PointerEvent<T>) => {
            const el = ref.current;
            const s = drag.current;
            if (!s.down) return;
            try {
                el?.releasePointerCapture?.(e.pointerId);
            } catch {
                /* already released */
            }
            s.down = false;
            delete el?.dataset.dragging;
            if (!s.moved || !el) return;
            s.suppressClick = true;
            const pts = s.samples;
            const first = pts[0];
            const last = pts[pts.length - 1];
            const dt = last.t - first.t;
            let v = dt > 0 ? (first.x - last.x) / dt : 0; // px per ms, scroll direction
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduce || Math.abs(v) < MIN_VELOCITY) {
                refreshFades();
                return;
            }
            let prev = performance.now();
            const step = (now: number) => {
                const frames = Math.min((now - prev) / 16.7, 4);
                prev = now;
                v *= Math.pow(decay, frames);
                if (Math.abs(v) < MIN_VELOCITY) {
                    s.raf = 0;
                    refreshFades();
                    return;
                }
                const before = el.scrollLeft;
                el.scrollLeft += v * 16.7 * frames;
                if (el.scrollLeft === before) {
                    s.raf = 0;
                    refreshFades();
                    return;
                }
                s.raf = requestAnimationFrame(step);
            };
            s.raf = requestAnimationFrame(step);
        },
        [decay, refreshFades],
    );

    const onPointerCancel = useCallback(() => {
        const el = ref.current;
        const s = drag.current;
        if (!s.down) return;
        s.down = false;
        if (el) delete el.dataset.dragging;
        stopMomentum();
        refreshFades();
    }, [stopMomentum, refreshFades]);

    const onPointerMove = useCallback(
        (e: React.PointerEvent<T>) => {
            if (e.isPrimary === false) return;
            if (e.pointerType === 'mouse' && e.buttons === 0) {
                endDrag(e);
                return;
            }
            const el = ref.current;
            const s = drag.current;
            if (!s.down || !el) return;
            const dx = e.clientX - s.startX;
            if (!s.moved && Math.abs(dx) < threshold) return;
            if (!s.moved) {
                s.moved = true;
                el.dataset.dragging = 'true';
                s.samples = [{ x: e.clientX, t: performance.now() }];
            }
            el.scrollLeft = s.startScroll - dx;
            const now = performance.now();
            s.samples.push({ x: e.clientX, t: now });
            // Keep ~120ms of samples for release-velocity math.
            while (s.samples.length > 2 && now - s.samples[0].t > 120) {
                s.samples.shift();
            }
            refreshFades();
        },
        [threshold, refreshFades, endDrag],
    );

    const onClickCapture = useCallback((e: React.MouseEvent<T>) => {
        if (drag.current.suppressClick) {
            drag.current.suppressClick = false;
            e.stopPropagation();
            e.preventDefault();
        }
    }, []);

    const onKeyDownCapture = useCallback(() => {
        drag.current.suppressClick = false;
    }, []);

    const onScroll = useCallback(() => {
        refreshFades();
    }, [refreshFades]);

    return {
        ref,
        dragProps: {
            onPointerDown,
            onPointerMove,
            onPointerUp: endDrag,
            onPointerCancel,
            onClickCapture,
            onKeyDownCapture,
            onScroll,
        },
    };
}
