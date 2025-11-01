import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GliderProps {
  lang?: "he" | "en";
  sections: string[];
  children: React.ReactNode;
}

export default function Glider({ lang = "he", sections, children }: GliderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 👁️ Watch scroll to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.2 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // 📏 Calculate Y positions of each section
useLayoutEffect(() => {
  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const positions = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top + rect.height / 2 + window.scrollY - containerTop;
    });
    setDotPositions(positions);
  };

  const timer = setTimeout(updatePositions, 200);
  window.addEventListener("resize", updatePositions);
  window.addEventListener("scroll", updatePositions);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", updatePositions);
    window.removeEventListener("scroll", updatePositions);
  };
}, [sections]);


  const side = lang === "he" ? "right" : "left";
  const xPosition = lang === "he" ? "90%" : "10%";

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center min-h-screen">
      {/* SVG Timeline */}
<svg
  className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
  xmlns="http://www.w3.org/2000/svg"
>

        {/* Vertical Line */}
        {dotPositions.length > 1 && (
          <line
            x1={xPosition}
            y1={dotPositions[0]}
            x2={xPosition}
            y2={dotPositions[dotPositions.length - 1]}
            stroke="#fffffe"
            strokeWidth="5"
          />
        )}

        {/* Dots */}
        {dotPositions.map((y, i) => {
          const id = sections[i];
          const isActive = activeSection === id;
          return (
            <g key={id} onClick={() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}>
              <circle
                cx={xPosition}
                cy={y}
                r="8"
                fill="#fffffe"
                stroke="#6B7C8F"
                strokeWidth="2.5"
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
              />
                {isActive && (
 <motion.circle
  cx={xPosition}
  cy={y}
  r="10"
  stroke="#6B7C8F"
  strokeWidth="2"
  fill="#fffffe"
  initial={{ scale: 1 }}
  animate={{
    scale: [1, 1.6, 1.1],
    strokeWidth: [2, 3, 2],
  }}
  transition={{
    duration: 1.8,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "mirror",
  }}
/>

                )}

            </g>
          );
        })}
      </svg>

      {/* Sections Content */}
      <div className="flex flex-col gap-20 md:gap-28 w-full relative z-10">
         {children}
      </div>
    </div>
  );
}
