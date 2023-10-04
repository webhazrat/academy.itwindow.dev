export default function PasswordForm() {
  return (
    <div className="space-y-3">
      <Label className="font-medium">পাসওয়ার্ড</Label>
      <Input type="password" />
      <p className="text-sm dark:text-slate-400">
        পাসওয়ার্ড কমপক্ষে 6 অক্ষরসহ 1টি লেটার এবং 1টি নাম্বার হতে হবে।
      </p>
      <p className="text-right">
        <button className="text-gradient">পাসওয়ার্ড ভুলে গেছেন?</button>
      </p>
      <Button className="bg-gradient text-white">লগইন করুন</Button>
    </div>
  );
}
