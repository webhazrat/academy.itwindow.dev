import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { loginSlider } from "../constants";
import Layout from "../components/Layout";
import PhoneInput from "../components/PhoneInput";
import OTPInput from "../components/OTPInput";
import UserDataInput from "../components/UserDataInput";

export default function Join() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  return (
    <>
      <Layout border>
        <div className="container my-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="space-y-12">
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

                {step === 1 && (
                  <PhoneInput setPhone={setPhone} setStep={setStep} />
                )}
                {step === 2 && (
                  <OTPInput
                    phone={phone}
                    setStep={setStep}
                    length={[1, 2, 3, 4]}
                  />
                )}
                {step === 3 && <UserDataInput phone={phone} />}
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
