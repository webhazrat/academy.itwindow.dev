import Image from "next/image";

export default function CourseItem({ course }) {
  return (
    <>
      <div className="bg-card border p-10 space-y-3 shadow-sm rounded-md h-full">
        <Image
          src={`/courses/${course.image}`}
          width={40}
          height={40}
          alt={course.slug}
        />
        <h3 className="text-[20px] font-semibold">{course.title}</h3>
        <p className="dark:text-slate-400">{course.excerpt}</p>
      </div>
    </>
  );
}
