import { format, parse } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export default function MyBatch({ batch }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="cursor-pointer">ব্যাচ বিস্তারিত</a>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-7">
          <DialogTitle>ব্যাচ বিস্তারিত</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
          <div className="p-7 pt-0">
            <div className="space-y-1">
              <p>
                <span className="dark:text-slate-400">ব্যাচ কোড:</span>{" "}
                {batch?.code}
              </p>
              <p>
                <span className="dark:text-slate-400">ক্লাসের দিন:</span>{" "}
                {batch?.days.join(", ")}
              </p>
              <p>
                <span className="dark:text-slate-400">সময়:</span>{" "}
                {batch?.time &&
                  format(parse(batch?.time, "HH:mm", new Date()), "hh:mm a")}
              </p>
              <p>
                <span className="dark:text-slate-400">স্ট্যাটাস:</span>{" "}
                <span
                  className={`${
                    batch?.status === "Pending"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {batch?.status}
                </span>
              </p>
              <p>
                <span className="dark:text-slate-400">ক্লাস শুরুর তারিখ:</span>{" "}
                {batch?.startDate && format(new Date(batch?.startDate), "PPP")}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
