import { JSX, useMemo, useState } from "react";
import Cropper,{Area} from "react-easy-crop";

import { Button } from "./button";
import { Dialog, DialogContent } from "./dialog";
import { Slider } from "./slider";

export type CropProfileKey = "avatar" | "banner" | "square" | "story";

export type CropProfile = {
  label: string;
  aspect: number;
  shape: "rect" | "round";
  output: {
    width: number;
    height: number;
  };
};

type CropDialogProps = {
    image: string;
    open: boolean;
    mode: CropProfileKey;
    onClose: () => void;
    onComplete: (blob: Blob) => void;
  };
  

export const CROP_PROFILES: Record<CropProfileKey, CropProfile> = {
  avatar: {
    label: "Profile picture",
    aspect: 1,
    shape: "round",
    output: { width: 512, height: 512 },
  },
  banner: {
    label: "Banner",
    aspect: 3 / 1,
    shape: "rect",
    output: { width: 1500, height: 500 },
  },
  square: {
    label: "Square",
    aspect: 1,
    shape: "rect",
    output: { width: 1080, height: 1080 },
  },
  story: {
    label: "Story",
    aspect: 9 / 16,
    shape: "rect",
    output: { width: 1080, height: 1920 },
  },
};


export default function ImageCropper({
    image,
    open,
    mode,
    onClose,
    onComplete
} : CropDialogProps){

    //set crop profile mode
    const profile = useMemo(()=>CROP_PROFILES[mode], [mode]);
    const [crop, setCrop] = useState({x:0,y:0});
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState<Area | null>(null);

    async function handleCrop(){
        if(!croppedArea) return;

        const blob = await getCroppedImage(image,croppedArea, profile);
        onComplete(blob);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <div className="relative h-80 w-full bg-neutral-50 dark:bg-neutral-950">
                    <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={profile.aspect}
                    cropShape={profile.shape ? profile.shape : "rect" }
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(_, area)=>setCroppedArea(area)}
                    />
                </div>
                <Slider
                min={1}
                max={3}
                step={0.1}
                value={[zoom]}
                onValueChange={([v])=>setZoom(v)}/>

                <Button className="w-full" onClick={handleCrop}>
                    Crop {profile.label}
                </Button>
            </DialogContent>
        </Dialog>
    );
}

async function getCroppedImage(
    imageSrc:string,
    crop: Area,
    profile: CropProfile
) : Promise<Blob>{

    //decode image
    const image = new Image();
    image.src = imageSrc;
    await image.decode();

    //create DOM element for image canvas
    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;

    //draw image in 2D context
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    )

    //arcing round shape
    if(profile.shape ==='round'){
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2,
            0,
            Math.PI * 2
        )
        ctx.fill();
    }
    return new Promise((resolve)=>canvas.toBlob((blob)=>resolve(blob!), "image/jpeg"));
}

export type UseCropperOptions = {
    initialMode?: CropProfileKey;
  };
  
  export type UseCropperReturn = {
    open: (image: string, mode?: CropProfileKey) => void;
    CropperUI: JSX.Element | null;
  };

  export function useCropper(
    onComplete: (blob: Blob) => void,
    options?: UseCropperOptions
  ): UseCropperReturn {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [mode, setMode] = useState<CropProfileKey>(
      options?.initialMode ?? "avatar"
    );
  
    function openCropper(img: string, m?: CropProfileKey) {
      setImage(img);
      setMode(m ?? mode);
      setOpen(true);
    }
  
    function closeCropper() {
      setOpen(false);
      setImage(null);
    }
  
    return {
      open: openCropper,
      CropperUI:
        open && image ? (
          <ImageCropper
            image={image}
            open={open}
            mode={mode}
            onClose={closeCropper}
            onComplete={(blob) => {
              onComplete(blob);
              closeCropper();
            }}
          />
        ) : null,
    };
  }