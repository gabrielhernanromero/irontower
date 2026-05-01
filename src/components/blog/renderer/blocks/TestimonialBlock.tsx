import type { TestimonialContent } from "@/types/blocks";

export default function TestimonialBlock({ content }: { content: TestimonialContent }) {
  if (!content.quote) return null;

  return (
    <div className="relative py-10 px-8 md:px-14 rounded-[4px] overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(14,77,122,0.08) 0%, rgba(14,77,122,0.04) 100%)" }}>
      <span className="absolute top-4 left-6 text-6xl text-brand-blue/20 font-condensed font-black leading-none select-none">&ldquo;</span>
      <blockquote className="relative z-10 font-body text-xl md:text-2xl text-brand-ink leading-relaxed italic mb-6">
        {content.quote}
      </blockquote>
      {(content.author || content.role || content.company) && (
        <footer className="flex flex-col gap-0.5">
          {content.author && <span className="font-condensed font-bold text-brand-ink text-base uppercase tracking-wide">{content.author}</span>}
          {(content.role || content.company) && (
            <span className="font-body text-sm text-brand-mid">
              {[content.role, content.company].filter(Boolean).join(" · ")}
            </span>
          )}
        </footer>
      )}
    </div>
  );
}
