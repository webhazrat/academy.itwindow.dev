import fs from "fs";
import path from "path";
import crypto from "crypto";
import multer from "multer";

export const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

export const uId = () => {
  const randdomString = crypto.randomBytes(6).toString("hex");
  return `${Date.now()}-${randdomString}`;
};

export async function sendOtpToPhone(phone, otp) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}

export function multerStorage(name, dest) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadsDir = path.join(process.cwd(), dest);
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, name + ext);
    },
  });

  const upload = multer({ storage });
  return Promise.resolve(upload);
}

export const unlinkPhoto = (image, dest) => {
  const currentPhotoPath = path.join(process.cwd(), dest, image);
  if (fs.existsSync(currentPhotoPath)) {
    fs.unlink(currentPhotoPath, (error) => {
      return true;
    });
  } else {
    return true;
  }
};
