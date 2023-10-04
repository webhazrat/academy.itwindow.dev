import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Label from "./Label";
import { Input } from "./ui/input";

export default function ProfileEdit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex gap-2">
          <Pencil size={14} />
          হালনাগাদ
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>প্রোফাইল হালনাগাদ</DialogTitle>
        </DialogHeader>
        <div>
          <form action="" className="space-y-5">
            <div className="space-y-3">
              <Label className="font-medium">নাম</Label>
              <Input type="text" />
            </div>
            <div className="space-y-3">
              <Label className="font-medium">ইমেইল</Label>
              <Input type="text" />
            </div>
            <div className="space-y-3">
              <Label className="font-medium">বর্তমান ঠিকানা</Label>
              <Input type="text" />
            </div>
            <div className="space-y-3">
              <Label className="font-medium">অভিভাবকের নাম</Label>
              <Input type="text" />
            </div>
            <div className="space-y-3">
              <Label className="font-medium">অভিভাবকের মোবাইল নাম্বার</Label>
              <Input type="text" />
            </div>
            <div className="space-y-3">
              <Label className="font-medium">সর্বশেষ শিক্ষাগত যোগ্যতা</Label>
              <Input type="text" />
            </div>
            <div className="space-y-3">
              <Label className="font-medium">প্রতিষ্ঠানের নাম</Label>
              <Input type="text" />
            </div>
            <Button type="submit" className="bg-gradient text-white">
              সংরক্ষণ
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
