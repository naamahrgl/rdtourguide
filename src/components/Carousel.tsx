import { useEffect, useState, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "./ui";

interface Recommendation {
  id: string;
  name_he: string;
  name_en: string;
  text_he: string;
  text_en: string;
}

interface Props {
  lang: "he" | "en";
}

export default function RecommendationsCarousel({ lang }: Props) {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: { perView: "auto", spacing: 16 },
    renderMode: "performance",
    drag: false,
      vertical: false,
  });

  const animationRef = useRef<number>(0);
  const speed = 1; // marquee speed

  // Fetch recommendations
  useEffect(() => {
    async function fetchRecs() {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbzg1_Z-kv6TgWbBss1orD7iOjxOoaolU5G2xnOiEH6tAaWapRJdb-yGus2Bb5YVEK6q/exec"
        );
        const data = await res.json();
        setRecs(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRecs();
  }, []);

// Infinite marquee
useEffect(() => {
  if (!slider?.current || recs.length === 0) return;

  const container = slider.current.container;
  let scrollPos = 0;
  const totalWidth = container.scrollWidth;
  let isPaused = false;

  const step = () => {
    if (!isPaused) {
      scrollPos += speed;
      if (scrollPos >= totalWidth) scrollPos = 0;
      container.scrollLeft = scrollPos;
    }
    animationRef.current = requestAnimationFrame(step);
  };

  const handleMouseEnter = () => { isPaused = true; };
  const handleMouseLeave = () => { isPaused = false; };

  // 🟢 NEW: pause on touch (mobile)
  const handleTouchStart = () => { isPaused = true; };
  const handleTouchEnd = () => { isPaused = false; };

  container.addEventListener("mouseenter", handleMouseEnter);
  container.addEventListener("mouseleave", handleMouseLeave);

  // 🟢 NEW: attach touch events
  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchend", handleTouchEnd);

  animationRef.current = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(animationRef.current);
    container.removeEventListener("mouseenter", handleMouseEnter);
    container.removeEventListener("mouseleave", handleMouseLeave);

    // 🟢 NEW: cleanup touch listeners
    container.removeEventListener("touchstart", handleTouchStart);
    container.removeEventListener("touchend", handleTouchEnd);
  };
}, [slider, recs]);



  if (!recs.length) return <p className="text-center">טוען המלצות...</p>;

  // Hard-coded 5x duplication
  const duplicated: Recommendation[] = [];
  for (let i = 0; i < 5; i++) {
    duplicated.push(...recs);
  }

  return (
    <div className="overflow-hidden py-8">
      <div
        ref={sliderRef}
        className="keen-slider "
      >
        {duplicated.map((rec, idx) => (
<div
  key={`${rec.id}-${idx}`}
  className="keen-slider__slide flex flex-col justify-between bg-white rounded-2xl shadow-md p-4 md:p-6 
             text-center border border-gray-200 flex-shrink-0 
             min-w-[260px] max-w-[400px] w-[80vw] md:w-[360px]"
>
<p className="text-sm md:text-base italic mb-4 leading-relaxed">
  "{(lang === "he" ? rec.text_he : rec.text_en).slice(0, 220)}
  {((lang === "he" ? rec.text_he : rec.text_en).length > 220) && "…"}"
</p>


  <h3 className="font-semibold text-gray-700 mt-auto text-sm md:text-base">
    — {lang === "he" ? rec.name_he : rec.name_en}
  </h3>

</div>



        ))}

      </div>
      <p>" " </p>
              <div className="block text-center">
      <Button
        text={lang === "he" ? "קראו עוד" : "Read More"}
        href={`/${lang}/recommendations`}
        variant="primary"
      />
    </div>

    </div>
  );
}
