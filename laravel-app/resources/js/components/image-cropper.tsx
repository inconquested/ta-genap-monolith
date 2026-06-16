import { useMemo, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { Button } from './ui/button';
import { Slider } from './ui/slider';

/* -------------------------------------------------------------------------- */
/*                                  PROFILES                                  */
/* -------------------------------------------------------------------------- */

export type CropProfileKey = 'avatar' | 'banner' | 'square' | 'story';

export type CropProfile = {
    label: string;
    aspect: number;
    shape: 'rect' | 'round';
    output: {
        width: number;
        height: number;
    };
};

export const CROP_PROFILES: Record<CropProfileKey, CropProfile> = {
    avatar: {
        label: 'Profile picture',
        aspect: 1,
        shape: 'round',
        output: { width: 512, height: 512 },
    },
    banner: {
        label: 'Banner',
        aspect: 3 / 1,
        shape: 'rect',
        output: { width: 1500, height: 500 },
    },
    square: {
        label: 'Square',
        aspect: 1,
        shape: 'rect',
        output: { width: 1080, height: 1080 },
    },
    story: {
        label: 'Story',
        aspect: 9 / 16,
        shape: 'rect',
        output: { width: 1080, height: 1920 },
    },
};

/* -------------------------------------------------------------------------- */
/*                               IMAGE PROCESSING                             */
/* -------------------------------------------------------------------------- */

async function cropImage(
    imageSrc: string,
    crop: Area,
    profile: CropProfile,
): Promise<Blob> {
    const image = new Image();
    image.src = imageSrc;
    await image.decode();

    const canvas = document.createElement('canvas');
    canvas.width = profile.output.width;
    canvas.height = profile.output.height;

    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height,
    );

    // Apply circular mask if avatar
    if (profile.shape === 'round') {
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2,
            0,
            Math.PI * 2,
        );
        ctx.fill();
    }

    return new Promise((resolve) =>
        canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.92),
    );
}

/* -------------------------------------------------------------------------- */
/*                            DIALOG COMPONENT                                */
/* -------------------------------------------------------------------------- */

type ImageCropperDialogProps = {
    image: string;
    mode: CropProfileKey;
    open: boolean;
    onClose: () => void;
    onComplete: (blob: Blob) => void;
};

function ImageCropperDialog({
    image,
    mode,
    open,
    onClose,
    onComplete,
}: ImageCropperDialogProps) {
    const profile = useMemo(() => CROP_PROFILES[mode], [mode]);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [area, setArea] = useState<Area | null>(null);

    async function handleCrop() {
        if (!area) return;
        const blob = await cropImage(image, area, profile);
        onComplete(blob);
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-xl rounded-lg bg-neutral-50 p-3 shadow-xl dark:bg-neutral-950">
                <div className="relative h-80 w-full bg-neutral-900">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={profile.aspect}
                        cropShape={profile.shape === 'round' ? 'round' : 'rect'}
                        zoomWithScroll
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, a) => setArea(a)}
                    />
                </div>
                <div className="px-2">
                    <Slider
                        min={1}
                        max={3}
                        step={0.05}
                        value={[zoom]}
                        onValueChange={([v]) => setZoom(v)}
                        className="transition-all ease-in"
                    />
                </div>
                <div className="mt-6 flex justify-between gap-2">
                    <Button onClick={onClose} type='button'>Cancel</Button>

                    <Button onClick={handleCrop} type='button'>Crop {profile.label}</Button>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                               PUBLIC HOOK API                              */
/* -------------------------------------------------------------------------- */

export function useImageCropper(
    onComplete: (blob: Blob) => void,
    initialMode: CropProfileKey = 'avatar',
) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [mode, setMode] = useState<CropProfileKey>(initialMode);

    function openCropper(img: string, m?: CropProfileKey) {
        setImage(img);
        setMode(m ?? initialMode);
        setOpen(true);
    }

    function closeCropper() {
        setOpen(false);
        setImage(null);
    }

    const CropperUI =
        open && image ? (
            <ImageCropperDialog
                image={image}
                mode={mode}
                open={open}
                onClose={closeCropper}
                onComplete={(blob) => {
                    onComplete(blob);
                    closeCropper();
                }}
            />
        ) : null;

    return {
        open: openCropper,
        CropperUI,
    };
}
