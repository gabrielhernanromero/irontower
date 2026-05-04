"use client";
import { useState, useEffect, useRef } from "react";
import { trackLectura } from "@/lib/analytics";

interface Props {
  slug?: string;
  titulo?: string;
}

const MILESTONES = [25, 50, 75, 100];

export default function ReadingProgress({ slug, titulo }: Props) {
  const [progress, setProgress] = useState(0);
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();
  }, [slug]);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      setProgress(pct);

      if (slug && titulo) {
        for (const m of MILESTONES) {
          if (pct >= m && !fired.current.has(m)) {
            fired.current.add(m);
            trackLectura(slug, titulo, m);
          }
        }
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [slug, titulo]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-[width] duration-100"
        style={{ width: `${progress}%`, background: "#E8721C" }}
      />
    </div>
  );
}
