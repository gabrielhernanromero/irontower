import type { StatsContent } from "@/types/blocks";

export default function StatsBlock({ content }: { content: StatsContent }) {
  const stats = content.stats ?? [];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center text-center p-6 rounded-[4px]" style={{ background: "rgba(14,77,122,0.06)" }}>
          <span className="text-3xl mb-2">{s.icon}</span>
          <span className="font-condensed font-black text-4xl text-brand-ink mb-1">{s.value}</span>
          <span className="font-body text-sm text-brand-mid uppercase tracking-wide">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
