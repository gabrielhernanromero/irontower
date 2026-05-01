"use client";
import type { StatsContent, StatItem } from "@/types/blocks";

interface Props { content: StatsContent; onChange: (c: StatsContent) => void }

const EMPTY_STAT: StatItem = { icon: "", value: "", label: "" };

export default function StatsFill({ content, onChange }: Props) {
  const stats = content.stats?.length ? content.stats : [EMPTY_STAT, EMPTY_STAT, EMPTY_STAT, EMPTY_STAT];

  const update = (i: number, field: keyof StatItem, val: string) => {
    const next = stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    onChange({ stats: next });
  };

  const add = () => onChange({ stats: [...stats, { ...EMPTY_STAT }] });
  const remove = (i: number) => onChange({ stats: stats.filter((_, idx) => idx !== i) });

  return (
    <div className="flex flex-col gap-2">
      {stats.map((s, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="text" placeholder="🔧" value={s.icon} onChange={(e) => update(i, "icon", e.target.value)}
            className="w-12 text-center border border-brand-light-border rounded-[3px] px-2 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
          <input type="text" placeholder="50m" value={s.value} onChange={(e) => update(i, "value", e.target.value)}
            className="w-20 border border-brand-light-border rounded-[3px] px-2 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
          <input type="text" placeholder="Altura máxima" value={s.label} onChange={(e) => update(i, "label", e.target.value)}
            className="flex-1 border border-brand-light-border rounded-[3px] px-2 py-2 font-body text-sm focus:outline-none focus:border-brand-blue" />
          <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs px-1">✕</button>
        </div>
      ))}
      <button type="button" onClick={add} className="font-body text-xs text-brand-blue hover:text-brand-ink transition-colors text-left mt-1">
        + Agregar estadística
      </button>
    </div>
  );
}
