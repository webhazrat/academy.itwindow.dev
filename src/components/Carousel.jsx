import Image from "next/image";
import { useEffect, useState } from "react";

export default function Carousel({ items, autoplayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(autoplay);
  }, [currentIndex, autoplayInterval]);

  return (
    <div>
      <div>
        {items?.length && (
          <>
            <Image
              src={items[currentIndex]?.image}
              priority
              width={300}
              height={150}
              className="m-auto"
              alt="carousel"
            />
            <p className="font-semibold dark:text-slate-400 mt-5">
              {items[currentIndex]?.title}
            </p>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-[6px] mt-5">
        {items?.map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer w-2 h-2 rounded-full block ${
              index === currentIndex ? "bg-gradient" : "bg-slate-100"
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
