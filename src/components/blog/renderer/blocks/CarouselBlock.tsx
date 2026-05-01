"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { CarouselContent, CarouselConfig } from "@/types/blocks";

export default function CarouselBlock({ content, config }: { content: CarouselContent; config: CarouselConfig }) {
  const images = content.images ?? [];
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  useEffect(() => {
    if (!config.autoplay || images.length <= 1) return;
    const t = setInterval(next, config.interval ?? 3000);
    return () => clearInterval(t);
  }, [config.autoplay, config.interval, images.length, next]);

  if (!images.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[4px]" style={{ aspectRatio: "16/9" }}>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-all duration-700"
          style={
            config.effect === "fade"
              ? { opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }
              : { transform: `translateX(${(i - current) * 100}%)`, zIndex: 1 }
          }
        >
          <Image src={src} alt={`Foto ${i + 1}`} fill className="object-cover" sizes="100vw" />
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">‹</button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">›</button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
