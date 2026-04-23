"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { target: 5,    suffix: "+", label: "Años de experiencia" },
  { target: 99,   suffix: "+", label: "Proyectos realizados" },
  { target: 100,  suffix: "%", label: "Índice de seguridad" },
  { target: 1000, suffix: "+", label: "Capacitaciones dictadas" },
];

function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setVal(current);
      if (current >= target) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [active, target]);

  return val;
}

function StatItem({ stat }: { stat: Stat }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const val = useCounter(stat.target, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <span className="font-condensed font-black text-white leading-none"
        style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
        {val}{stat.suffix}
      </span>
      <span className="font-body text-white/70 text-sm">{stat.label}</span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div
      className="px-[5%] py-10"
      style={{ background: "#1a2030" }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>
    </div>
  );
}
