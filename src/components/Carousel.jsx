import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {items?.length && (
            <>
              <motion.img src={items[currentIndex]?.image} className="m-auto" />
              <motion.p className="font-semibold dark:text-slate-400 mt-5">
                {items[currentIndex]?.title}
              </motion.p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-[6px] mt-5">
        {items?.map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer w-2 h-2 rounded-full block ${
              index === currentIndex ? "bg-gradient" : "bg-slate-100"
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
