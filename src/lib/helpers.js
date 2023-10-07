export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export async function sendOtpToPhone(phone, otp) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
