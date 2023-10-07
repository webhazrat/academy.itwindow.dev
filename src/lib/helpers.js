export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// export async function storeOtp(phone, otp) {
//   await redis.set(`otp:${phone}`, otp, "EX", 5 * 60);
// }

// export async function retrieveOtp(phone) {
//   return await redis.get(`otp:${phone}`);
// }

// export async function validateOtp(phone, otp) {
//   const storedOtp = await redis.get(`otp:${phone}`);
//   return otp === storedOtp;
// }

export async function sendOtpToPhone(phone, otp) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
