import React, { useEffect, useState } from "react";
import { Box } from "./ui";

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

export default function RecommendationsPage({ lang }: Props) {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }
    fetchRecs();
  }, []);

  if (loading) {
    return <p className="text-center py-8">טוען המלצות...</p>;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        {lang === "he" ? "המלצות מלקוחות" : "Customer Recommendations"}
      </h1>

      {/* Masonry-style layout */}
      <div
        className={`columns-1 sm:columns-2 md:columns-3 gap-4 ${
          lang === "he" ? "text-right" : "text-left"
        }`}
      >
        {recs.map((rec, idx) => {
          const text = lang === "he" ? rec.text_he : rec.text_en;
          const name = lang === "he" ? rec.name_he : rec.name_en;
          const isRight = idx % 1 === 0;

          return (
            <div key={rec.id} className="break-inside-avoid mb-4 text-center items items-center">
              <Box
                className={`relative w-full rounded-2xl p-4 shadow-sm text-sm leading-relaxed border ${
                  isRight
                    ? "bg-[#dcf8c6] text-gray-800 border-transparent"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                <p className="italic mb-3">{text}</p>
                <span className="block text-xs font-semibold text-gray-500">
                  — {name}
                </span>
                {/* WhatsApp tail */}
                <span
                  className={`absolute bottom-0 ${
                    isRight
                      ? "right-[-6px] border-l-[6px]"
                      : "left-[-6px] border-r-[6px]"
                  } border-t-[6px] border-transparent ${
                    isRight
                      ? "border-l-[#dcf8c6]"
                      : "border-r-white"
                  }`}
                />
              </Box>
            </div>
          );
        })}
      </div>
    </section>
  );
}
