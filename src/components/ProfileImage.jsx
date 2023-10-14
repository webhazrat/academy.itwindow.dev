import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { getCroppedImg, readFile } from "../lib/utils";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

export default function ProfileImage({ mutate }) {
  const [image, setImage] = useState({
    src: "",
    originalname: "",
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = async (_, croppedAreaPixels) => {
    const cropped = await getCroppedImg(image.src, croppedAreaPixels);
    setCroppedImage(cropped);
  };

  const handleProfileImage = async () => {
    const formData = new FormData();
    formData.append("file", croppedImage, image.originalname);
    try {
      const response = await fetch("/api/user/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImage({ src: "", originalname: "" });
      if (response.ok) {
        mutate();
      }
      console.log({ ProfileImage: data });
    } catch (error) {
      console.log({ ProfileImage: error });
    }
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const imageDataUrl = await readFile(file);
        setImage({ src: imageDataUrl, originalname: file.name });
      } else {
        console.log({ profilePage: "Please select an image file" });
      }
    }
  };

  return (
    <>
      <div className="absolute -right-1 bottom-1">
        <label
          htmlFor="photo"
          className="rounded-full h-9 w-9 border flex justify-center items-center bg-background cursor-pointer hover:bg-secondary"
        >
          <Pencil size={14} />
          <input
            type="file"
            id="photo"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      </div>
      <Dialog open={image.src} onOpenChange={setImage}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>প্রোফাইল ফটো</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative w-full h-60 bg-background block">
              <Cropper
                image={image.src}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                aspect={1}
                showGrid={false}
                onCropComplete={onCropComplete}
              />
            </div>
            {croppedImage && (
              <Button
                onClick={handleProfileImage}
                className="bg-gradient text-white"
              >
                আপলোড
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
