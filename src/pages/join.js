import { useState } from "react";
import Carousel from "../components/Carousel";
import { loginSlider } from "../constants";
import Layout from "../components/Layout";
import PhoneInput from "../components/PhoneInput";
import OTPInput from "../components/OTPInput";
import UserDataInput from "../components/UserDataInput";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { checkLoggedin } from "../middleware/clientAuth";

export default function Join() {
  const [currentStep, setCurrentStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  // send otp
  const handleOtpSend = async (data) => {
    try {
      const response = await fetch("/api/sign-up/otp-send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const otpSendResponse = await response.json();
      if (!response.ok) {
        return otpSendResponse;
      } else {
        setPhone(otpSendResponse.data.phone);
        setCurrentStep(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // otp verify
  const handleOtpVerify = async (data) => {
    try {
      const response = await fetch("/api/sign-up/otp-verify", {
        method: "POST",
        body: JSON.stringify({ phone, otp: data.otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const otpVerifyResponse = await response.json();
      if (!response.ok) {
        return otpVerifyResponse;
      } else {
        setPhone(otpVerifyResponse.data.phone);
        setOtp(otpVerifyResponse.data.otp);
        setCurrentStep(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // final submit
  const handleSubmitUserData = async (data) => {
    try {
      const response = await fetch("/api/sign-up/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const registerResponse = await response.json();
      if (!response.ok) {
        return registerResponse;
      } else {
        setCurrentStep(3);
        setPhone("");
        setOtp("");
      }
      console.log({ registerResponse });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackOtp = () => {
    setCurrentStep(0);
  };

  const handleBackSubmit = () => {
    setCurrentStep(1);
  };

  return (
    <>
      <Layout border>
        <div className="container my-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="space-y-10">
                <div>
                  <h1 className="font-semibold text-2xl mb-2">
                    অ্যাকাউন্ট তৈরি করুন
                  </h1>
                  <p className="dark:text-slate-400">
                    আমাদের এই লার্নিং প্লাটফর্মে আপনি সংযুক্ত হয়ে আপনি আপনার
                    একাডেমিক আইসিটি বিষয়ে দক্ষতা অর্জনের সাথে সাথে দক্ষতা উন্নয়ন
                    কোর্সগুলো নিয়ে নিজের ভবিষ্যত কর্মজীবনকে আগিয়ে নিতে পারেন
                    নিজের মত করে।
                  </p>
                </div>

                {currentStep === 0 && (
                  <PhoneInput
                    handleOtpSend={handleOtpSend}
                    phone={phone}
                    setPhone={setPhone}
                  />
                )}
                {currentStep === 1 && (
                  <OTPInput
                    phone={phone}
                    handleOtpVerify={handleOtpVerify}
                    onBack={handleBackOtp}
                    handleOtpSend={handleOtpSend}
                  />
                )}
                {currentStep === 2 && (
                  <UserDataInput
                    onSubmit={handleSubmitUserData}
                    onBack={handleBackSubmit}
                    phone={phone}
                    otp={otp}
                  />
                )}
                {currentStep === 3 && (
                  <p className="text-green-300 border py-3 px-4 rounded-md flex items-center gap-1">
                    অভিনন্দন! অ্যাকাউন্ট সঠিকভাবে তৈরি হয়েছে। {""}
                    <span className="flex items-center gap-1">
                      <LogIn size={14} /> <Link href={"/login"}>লগইন করুন</Link>
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="text-center">
              <Carousel items={loginSlider} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  return checkLoggedin(context);
}
