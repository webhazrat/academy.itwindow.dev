import Carousel from "../components/Carousel";
import { loginSlider } from "../constants";
import Layout from "../components/Layout";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../lib/validation";
import { signIn, getSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data) => {
    const status = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (status.ok) {
      router.push(status.url);
    } else {
      setError("common", {
        type: "server",
        message: status.error,
      });
    }
  };

  return (
    <>
      <Layout border>
        <div className="container my-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="space-y-8">
                <div>
                  <h1 className="font-semibold text-2xl mb-2">লগইন</h1>
                  <p className="dark:text-slate-400">
                    আমাদের এই লার্নিং প্লাটফর্মে আপনি সংযুক্ত হয়ে আপনি আপনার
                    একাডেমিক আইসিটি বিষয়ে দক্ষতা অর্জনের সাথে সাথে দক্ষতা উন্নয়ন
                    কোর্সগুলো নিয়ে নিজের ভবিষ্যত কর্মজীবনকে আগিয়ে নিতে পারেন
                    নিজের মত করে।
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="phone" className="font-medium">
                        মোবাইল নাম্বার
                      </Label>
                      <p className="text-sm dark:text-slate-400">
                        যে মোবাইল নাম্বার ব্যবহার করে অ্যাকাউন্ট করেছিলেন।
                      </p>
                    </div>
                    <Input
                      type="text"
                      id="phone"
                      {...register("phone")}
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="password" className="font-medium">
                        পাসওয়ার্ড
                      </Label>
                      <p className="text-sm dark:text-slate-400">
                        পাসওয়ার্ড কমপক্ষে আট(8) অক্ষরের হতে হবে।
                      </p>
                    </div>
                    <Input
                      type="password"
                      id="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {errors.common && (
                    <p className="text-sm text-red-400">
                      {errors.common.message}
                    </p>
                  )}

                  <div className="flex gap-2 items-center justify-between">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient text-white"
                    >
                      {isSubmitting && (
                        <Loader2 size={16} className="mr-2 animate-spin" />
                      )}
                      লগইন করুন
                    </Button>
                    <button className="text-gradient">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </div>
                </form>
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: `/profile`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
