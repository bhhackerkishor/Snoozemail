"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
type CounterProps = { value: string | number; suffix?: string };

const Counter = ({ value, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target =
            typeof value === "string"
              ? parseInt(value.replace(/,/g, ""), 10)
              : value; // Remove commas for numbers like 10,000
          const duration = 2;
          const startTime = performance.now();

          const animateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / (duration * 1000), 1);
            const currentCount = Math.floor(progress * target);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  // Format number with commas if needed
  const formattedValue = count.toLocaleString();

  return (
    <span ref={ref}>
      {suffix === "%" ? `${count}${suffix}` : `${formattedValue}${suffix}`}
    </span>
  );
};

const StatsSection = () => {
  const stats = [
    { value: "10000", label: "Emails Snoozed", suffix: "+" },
    { value: "98", label: "Delivery Rate", suffix: "%" },
    { value: "24/7", label: "Uptime" },
    { value: "2", label: "Fastest Reminder", suffix: "min" },
  ];

  return (
    <section className="py-12 bg-sky-50 dark:bg-sky-950/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-bold text-sky-800 dark:text-sky-200">
                {stat.value.includes("/") ? (
                  stat.value // For non-numerical values like "24/7"
                ) : (
                  <Counter value={Number(stat.value)} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
