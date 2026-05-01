import type { TextContent } from "@/types/blocks";

export default function TextBlock({ content }: { content: TextContent }) {
  if (!content.html) return null;
  return (
    <div
      className="prose prose-base max-w-none font-body text-brand-ink"
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  );
}
