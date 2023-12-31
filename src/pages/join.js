import { useState } from "react";
import Carousel from "../components/Carousel";
import { loginSlider } from "../constants";
import Layout from "../components/Layout";
import UserDataInput from "../components/UserDataInput";
import { checkLoggedin } from "../middleware/clientAuth";
import OtpSend from "../components/OtpSend";
import OtpVerify from "../components/OtpVerify";
import { useRouter } from "next/router";
import { useToast } from "../components/ui/use-toast";

export default function Join() {
  const [currentStep, setCurrentStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // otp send
  const handleOtpSend = async (data) => {
    try {
      const response = await fetch("/api/user/otp-send", {
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
      const response = await fetch("/api/user/otp-verify", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const otpVerifyResponse = await response.json();
      if (!response.ok) {
        return otpVerifyResponse;
      } else {
        setPhone(otpVerifyResponse.data.phone);
        setToken(otpVerifyResponse.data.token);
        setCurrentStep(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // final submit
  const handleSubmitUserData = async (data) => {
    try {
      const response = await fetch("/api/user/register", {
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
        setPhone("");
        setToken("");
        toast({
          variant: "success",
          title: registerResponse.title,
          description: registerResponse.message,
        });

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
      console.log({ registerResponse });
    } catch (error) {
      console.log(error);
    }
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
                  <OtpSend
                    handleOtpSend={handleOtpSend}
                    comment={
                      "মোবাইল নাম্বার ভেরিফাই করার জন্য সঠিক মোবাইল নাম্বার ইনপুট করুন।"
                    }
                  />
                )}
                {currentStep === 1 && (
                  <OtpVerify
                    phone={phone}
                    handleOtpVerify={handleOtpVerify}
                    handleOtpSend={handleOtpSend}
                  />
                )}
                {currentStep === 2 && (
                  <UserDataInput
                    handleSubmitUserData={handleSubmitUserData}
                    phone={phone}
                    token={token}
                  />
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
