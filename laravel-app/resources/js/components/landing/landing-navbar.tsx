import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import {
    ChevronDown,
    Menu,
    X,
    BarChart3,
    ShieldCheck,
    Eye,
    Building2,
    GraduationCap,
    Users,
    ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AppLogo from '@/components/app-logo';
import type { LucideIcon } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavChild {
    title: string;
    href: string;
    description: string;
    icon: LucideIcon;
}

interface NavSection {
    title: string;
    href?: string;
    children?: NavChild[];
    /** Optional "featured" block shown on the right side of the mega menu */
    featured?: {
        title: string;
        description: string;
        href: string;
        icon: LucideIcon;
    };
}

// ─── Navigation Data ─────────────────────────────────────────────────────────

const navItems: NavSection[] = [
    {
        title: 'Platform',
        children: [
            {
                title: 'Voting Real-time',
                href: '#features',
                description: 'Pantau perolehan suara langsung saat pemungutan berlangsung.',
                icon: BarChart3,
            },
            {
                title: 'Keamanan End-to-End',
                href: '#features',
                description: 'Setiap suara terenkripsi dan tidak dapat dimanipulasi.',
                icon: ShieldCheck,
            },
            {
                title: 'Audit Transparan',
                href: '#features',
                description: 'Pemilih memverifikasi bahwa suara mereka tercatat dengan benar.',
                icon: Eye,
            },
        ],
        featured: {
            title: 'Lihat semua fitur',
            description: 'Jelajahi kemampuan platform Electa secara lengkap.',
            href: '#features',
            icon: ArrowRight,
        },
    },
    {
        title: 'Solusi',
        children: [
            {
                title: 'Perusahaan & Institusi',
                href: '#solution',
                description: 'Rapat umum pemegang saham, pemilihan internal, dan keputusan korporat.',
                icon: Building2,
            },
            {
                title: 'Pendidikan',
                href: '#solution',
                description: 'Pemilihan BEM, polling kelas, dan pengambilan keputusan kampus.',
                icon: GraduationCap,
            },
            {
                title: 'Komunitas & Organisasi',
                href: '#solution',
                description: 'Voting anggota, survei komunitas, dan keputusan kolektif.',
                icon: Users,
            },
        ],
        featured: {
            title: 'Butuh solusi khusus?',
            description: 'Hubungi tim kami untuk deployment on-premise atau kustomisasi.',
            href: '#contact',
            icon: ArrowRight,
        },
    },
    {
        title: 'Demo',
        href: '#demo',
    },
    {
        title: 'Dokumentasi',
        href: '#features',
    },
];

// ─── Animation Config ────────────────────────────────────────────────────────

const menuTransition = {
    layout: { type: 'spring', stiffness: 350, damping: 30 },
    content: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
};

// ─── Direction-aware floating dropdown ───────────────────────────────────────

type SwipeDir = 'left' | 'right';

function DropdownMenu({
    activeItem,
    direction,
}: {
    activeItem: NavSection | null;
    direction: SwipeDir;
}) {
    const xInitial = direction === 'left' ? -12 : 12;

    return (
        <AnimatePresence mode="wait">
            {activeItem?.children && (
                <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, x: xInitial, y: 4 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: xInitial, y: 4 }}
                    transition={menuTransition.content}
                    className="absolute left-0 top-full pt-2"
                >
                    <div className="w-80 rounded-xl border border-border/60 bg-background/95 p-2 shadow-lg shadow-black/5 backdrop-blur-xl">
                        <div className="flex flex-col gap-0.5">
                            {activeItem.children.map((child, i) => {
                                const Icon = child.icon;
                                return (
                                    <motion.div
                                        key={child.title}
                                        initial={{ opacity: 0, x: xInitial * 0.5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            ...menuTransition.content,
                                            delay: 0.03 + i * 0.03,
                                        }}
                                    >
                                        <Link
                                            href={child.href}
                                            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-accent"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/40 text-foreground/50 transition-colors group-hover:border-border group-hover:text-foreground/80">
                                                <Icon className="h-3.5 w-3.5" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-foreground">
                                                    {child.title}
                                                </div>
                                                <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
                                                    {child.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {activeItem.featured && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ ...menuTransition.content, delay: 0.12 }}
                                className="mt-1 border-t border-border/40 pt-1"
                            >
                                <Link
                                    href={activeItem.featured.href}
                                    className="group flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-accent"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                                        <activeItem.featured.icon className="h-3 w-3" />
                                    </div>
                                    <span className="text-[13px] font-medium text-primary transition-colors group-hover:text-primary/80">
                                        {activeItem.featured.title}
                                    </span>
                                    <ArrowRight className="ml-auto h-3 w-3 text-primary/50 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ─── Desktop Nav Trigger (with embedded dropdown) ────────────────────────────

function NavTrigger({
    item,
    isActive,
    direction,
    onEnter,
    onLeave,
}: {
    item: NavSection;
    isActive: boolean;
    direction: SwipeDir;
    onEnter: (e: React.MouseEvent) => void;
    onLeave: () => void;
}) {
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren) {
        return (
            <Link
                href={item.href ?? '#'}
                className="relative flex h-full items-center px-3 text-sm font-medium text-foreground/60 transition-colors duration-150 hover:text-foreground"
            >
                {item.title}
            </Link>
        );
    }

    return (
        <div
            className="relative flex h-full items-center"
            onMouseEnter={(e) => onEnter(e)}
            onMouseLeave={onLeave}
        >
            <button
                className={cn(
                    'relative flex items-center gap-1 px-3 text-sm font-medium transition-colors duration-150',
                    isActive
                        ? 'text-foreground'
                        : 'text-foreground/60 hover:text-foreground'
                )}
                aria-expanded={isActive}
                aria-haspopup="true"
            >
                {item.title}
                <ChevronDown
                    className={cn(
                        'h-3 w-3 transition-transform duration-200',
                        isActive && 'rotate-180'
                    )}
                />
                <motion.div
                    className="absolute bottom-0 left-3 right-3 h-px bg-foreground"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'center' }}
                />
            </button>

            {/* Direction-aware floating dropdown */}
            {isActive && (
                <DropdownMenu activeItem={item} direction={direction} />
            )}
        </div>
    );
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────

function MobileMenu({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background shadow-lg lg:hidden"
                    >
                        <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
                            <AppLogo />
                            <button
                                onClick={onClose}
                                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="max-h-[70vh] overflow-y-auto px-3 py-3">
                            <ul className="space-y-0.5">
                                {navItems.map((item, i) => (
                                    <li key={i}>
                                        {item.children ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setExpandedIndex(
                                                            expandedIndex === i ? null : i
                                                        )
                                                    }
                                                    className={cn(
                                                        'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                                                        expandedIndex === i
                                                            ? 'bg-accent text-foreground'
                                                            : 'text-foreground/70 hover:bg-accent/50 hover:text-foreground'
                                                    )}
                                                >
                                                    {item.title}
                                                    <motion.div
                                                        animate={{
                                                            rotate: expandedIndex === i ? 180 : 0,
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronDown className="h-4 w-4" />
                                                    </motion.div>
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {expandedIndex === i && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{
                                                                duration: 0.2,
                                                                ease: [0.16, 1, 0.3, 1],
                                                            }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="space-y-0.5 pb-2 pl-4">
                                                                {item.children.map((child, j) => {
                                                                    const Icon = child.icon;
                                                                    return (
                                                                        <Link
                                                                            key={j}
                                                                            href={child.href}
                                                                            onClick={onClose}
                                                                            className="flex items-start gap-2.5 rounded-md px-3 py-2 transition-colors hover:bg-accent"
                                                                        >
                                                                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                                                            <div>
                                                                                <div className="text-sm font-medium text-foreground/80">
                                                                                    {child.title}
                                                                                </div>
                                                                                <div className="text-xs text-muted-foreground">
                                                                                    {child.description}
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href ?? '#'}
                                                onClick={onClose}
                                                className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent/50 hover:text-foreground"
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="flex gap-2 border-t border-border/50 p-4">
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="flex-1 rounded-md border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                onClick={onClose}
                                className="flex-1 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Daftar
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export default function LandingNavbar() {
    const [activeMenu, setActiveMenu] = useState<NavSection | null>(null);
    const [swipeDir, setSwipeDir] = useState<SwipeDir>('left');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { scrollY } = useScroll();
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 10);
    });

    const handleMenuEnter = useCallback((item: NavSection, e: React.MouseEvent) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        // Determine swipe direction from cursor position relative to nav center
        const navEl = navRef.current;
        if (navEl) {
            const navRect = navEl.getBoundingClientRect();
            const navCenterX = navRect.left + navRect.width / 2;
            setSwipeDir(e.clientX < navCenterX ? 'left' : 'right');
        }
        setActiveMenu(item);
    }, []);

    const handleMenuLeave = useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 150);
    }, []);

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    // Lock body scroll on mobile open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const isMenuOpen = activeMenu !== null;

    return (
        <>
            <motion.header
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-colors duration-200',
                    isScrolled || isMenuOpen
                        ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl'
                        : 'bg-transparent'
                )}
            >
                <div
                    ref={navRef}
                    className="mx-auto flex h-14 max-w-7xl items-center px-6"
                >
                    {/* Logo */}
                    <Link href="/" className="mr-8 flex shrink-0 items-center">
                        <AppLogo />
                    </Link>

                    {/* Desktop Nav Triggers */}
                    <nav className="hidden h-full items-center lg:flex">
                        {navItems.map((item, i) => (
                            <NavTrigger
                                key={i}
                                item={item}
                                isActive={activeMenu?.title === item.title}
                                direction={swipeDir}
                                onEnter={(e: React.MouseEvent) => handleMenuEnter(item, e)}
                                onLeave={handleMenuLeave}
                            />
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="ml-auto hidden items-center gap-1 lg:flex">
                        <Link
                            href="/login"
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                        >
                            Daftar
                        </Link>
                    </div>

                    {/* Mobile trigger */}
                    <button
                        onClick={() => setIsMobileOpen((v) => !v)}
                        className="ml-auto rounded-md p-2 text-foreground/60 transition-colors hover:text-foreground lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {isMobileOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu (dropdown from top) */}
            <div className="lg:hidden">
                <MobileMenu
                    isOpen={isMobileOpen}
                    onClose={() => setIsMobileOpen(false)}
                />
            </div>
        </>
    );
}
