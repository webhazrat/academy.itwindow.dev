import fs from "fs";
import path from "path";
import crypto from "crypto";
import multer from "multer";

export const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

export const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const uId = () => {
  const randdomString = crypto.randomBytes(6).toString("hex");
  return `${Date.now()}-${randdomString}`;
};

export async function sendSMS(phone, msg) {
  const encodeMsg = encodeURIComponent(msg);
  try {
    const response = await fetch(
      `https://tpsms.xyz/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}=&to=${phone}&from=8809612444246&sms=${encodeMsg}`
    );
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
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
  const currentPhotoPath = image && path.join(process.cwd(), dest, image);
  if (fs.existsSync(currentPhotoPath)) {
    fs.unlink(currentPhotoPath, (error) => {
      return error;
    });
  } else {
    return true;
  }
};
