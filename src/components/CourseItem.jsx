import Image from "next/image";

export default function CourseItem({ course }) {
  return (
    <>
      <div className="bg-card border p-10 space-y-3 shadow-sm rounded-md h-full">
        <Image src={course.icon} width={40} height={40} alt={course.id} />
        <h3 className="text-[20px] font-semibold">{course.title}</h3>
        <p className="dark:text-slate-400">{course.description}</p>
      </div>
    </>
  );
}
