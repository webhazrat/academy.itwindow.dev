import { format, parse } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export default function MyFeedback({ batch }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="cursor-pointer">ফিডব্যাক দিন</a>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-7">
          <DialogTitle>ফিডব্যাক</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
          <div className="p-7 pt-0">
            <form action=""></form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
