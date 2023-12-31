import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isActive = (path, href) => {
  return path === href;
};

export const APP_URL = "https://academy.itwindow.dev";

export const OTP_EXPIRE_TIME = 5 * 60;

// swr fetcher method
export const fetcher = async (...args) => {
  return fetch(...args).then((res) => res.json());
};

// readfile method for crop image
export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

// croping image method
export function getCroppedImg(imageSrc, pixelCrop) {
  const image = new Image();
  image.src = imageSrc;

  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    300,
    300
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
}

// total
export const total = (payments, status) => {
  return payments?.reduce(
    (total, payment) =>
      payment.status === status ? total + Number(payment.amount) : total,
    0
  );
};

// status color
export const statusColor = (status) => {
  const warning = ["Pending"];
  const success = [
    "Completed",
    "Approved",
    "Verified",
    "Ongoing",
    "Ended",
    "Published",
  ];
  const danger = ["Unverified", "Unpublished", "Canceled"];
  if (warning.includes(status)) {
    return "text-yellow-400";
  }
  if (success.includes(status)) {
    return "text-green-400";
  }
  if (danger.includes(status)) {
    return "text-red-400";
  }
};
