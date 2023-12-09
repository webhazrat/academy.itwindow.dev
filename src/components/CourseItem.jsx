import Image from "next/image";

export default function CourseItem({ course }) {
  return (
    <>
      <div className="bg-card border p-7 shadow-sm rounded-md h-full flex flex-col gap-3 justify-between hover:bg-card/80">
        <div className="space-y-3">
          {course.icon && (
            <Image
              src={`/courses/${course.icon}`}
              width={40}
              height={40}
              alt={course.slug}
            />
          )}
          <h3 className="text-[20px] font-semibold">{course.title}</h3>
          <p className="dark:text-slate-400">{course.excerpt}</p>
        </div>
        <h4 className="text-lg font-medium flex justify-between items-center">
          <span>
            ৳{course.fee}{" "}
            {course.prevFee > course.fee && (
              <del className="dark:text-slate-400">৳{course.prevFee}</del>
            )}
          </span>
          <span className="text-sm dark:text-slate-400"> /কোর্স</span>
        </h4>
      </div>
    </>
  );
}
