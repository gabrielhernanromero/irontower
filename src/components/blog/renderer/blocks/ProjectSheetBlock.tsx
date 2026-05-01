import type { ProjectSheetContent } from "@/types/blocks";

export default function ProjectSheetBlock({ content }: { content: ProjectSheetContent }) {
  const sheet = content.sheet ?? [];
  if (!sheet.length) return null;

  return (
    <div className="rounded-[4px] overflow-hidden border border-brand-blue/15">
      <div className="bg-brand-blue px-5 py-3">
        <span className="font-condensed font-bold text-white text-sm uppercase tracking-widest">Ficha Técnica</span>
      </div>
      <dl className="divide-y divide-brand-blue/10">
        {sheet.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-baseline px-5 py-3 gap-1 sm:gap-4" style={{ background: i % 2 === 0 ? "rgba(14,77,122,0.03)" : "transparent" }}>
            <dt className="font-condensed font-bold text-brand-blue text-sm uppercase tracking-wide sm:w-44 shrink-0">{item.key}</dt>
            <dd className="font-body text-brand-ink text-sm">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
