export default function MobileVerifyForm() {
  return (
    <div>
      <Button variant="outline" className="mb-8">
        <ChevronLeft />
      </Button>

      <div className="space-y-3">
        <Label className="font-medium">মোবাইল নাম্বার ভেরিফাই করুন</Label>
        <p className="text-sm dark:text-slate-400">
          +8801712 122501 নাম্বারে 4 সংখ্যার কোড পাঠানো হয়েছে। কোডটি এখানে ইনপুট
          করুন।
        </p>
        <div className="grid grid-cols-4 gap-5">
          <Input
            type="text"
            className="aspect-video h-auto text-2xl text-center"
          />
          <Input
            type="text"
            className="aspect-video h-auto text-2xl text-center"
          />
          <Input
            type="text"
            className="aspect-video h-auto text-2xl text-center"
          />
          <Input
            type="text"
            className="aspect-video h-auto text-2xl text-center"
          />
        </div>

        <p className="text-right">
          <button className="text-gradient">আবার কোড পাঠান</button>
        </p>

        <Button className="bg-gradient text-white">সাবমিট করুন</Button>
      </div>
    </div>
  );
}
