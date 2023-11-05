import DashboardLayout from "@/src/components/DashboardLayout";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { ClipboardPaste } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-7">
        <div className="space-y-3">
          <h1>ড্যাশবোর্ড</h1>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5">
            <Link href={"/"}>
              <a>
                <div className="border rounded-md p-5">
                  <div className="flex gap-5 justify-between">
                    <div>
                      <h4 className="mb-2 font-medium dark:text-slate-300">
                        ইনরোল রিকুয়েস্টস
                      </h4>
                      <h2 className="font-bold text-3xl">10</h2>
                      <p className="text-sm dark:text-slate-400">
                        +20.1% শেষ মাস হইতে
                      </p>
                    </div>
                    <ClipboardPaste size={16} className="dark:text-slate-400" />
                  </div>
                </div>
              </a>
            </Link>
            <Link href={"/"}>
              <a>
                <div className="border rounded-md p-5">
                  <div className="flex gap-5 justify-between">
                    <div>
                      <h4 className="mb-2 font-medium dark:text-slate-300">
                        ইনরোল রিকুয়েস্টস
                      </h4>
                      <h2 className="font-bold text-3xl">10</h2>
                      <p className="text-sm dark:text-slate-400">
                        +20.1% শেষ মাস হইতে
                      </p>
                    </div>
                    <ClipboardPaste size={16} className="dark:text-slate-400" />
                  </div>
                </div>
              </a>
            </Link>
            <Link href={"/"}>
              <a>
                <div className="border rounded-md p-5">
                  <div className="flex gap-5 justify-between">
                    <div>
                      <h4 className="mb-2 font-medium dark:text-slate-300">
                        ইনরোল রিকুয়েস্টস
                      </h4>
                      <h2 className="font-bold text-3xl">10</h2>
                      <p className="text-sm dark:text-slate-400">
                        +20.1% শেষ মাস হইতে
                      </p>
                    </div>
                    <ClipboardPaste size={16} className="dark:text-slate-400" />
                  </div>
                </div>
              </a>
            </Link>
            <Link href={"/"}>
              <a>
                <div className="border rounded-md p-5">
                  <div className="flex gap-5 justify-between">
                    <div>
                      <h4 className="mb-2 font-medium dark:text-slate-300">
                        ইনরোল রিকুয়েস্টস
                      </h4>
                      <h2 className="font-bold text-3xl">10</h2>
                      <p className="text-sm dark:text-slate-400">
                        +20.1% শেষ মাস হইতে
                      </p>
                    </div>
                    <ClipboardPaste size={16} className="dark:text-slate-400" />
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  return checkAdmin(context);
}
