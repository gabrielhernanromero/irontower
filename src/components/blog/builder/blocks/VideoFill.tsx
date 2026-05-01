"use client";
import type { VideoContent } from "@/types/blocks";

interface Props { content: VideoContent; onChange: (c: VideoContent) => void }

export default function VideoFill({ content, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="url"
        placeholder="URL de YouTube o Vimeo"
        value={content.url ?? ""}
        onChange={(e) => onChange({ url: e.target.value })}
        className="border border-brand-light-border rounded-[3px] px-3 py-2 font-body text-sm focus:outline-none focus:border-brand-blue"
      />
      <p className="font-body text-xs text-brand-muted">
        Ej: https://www.youtube.com/watch?v=XXXXXXX o https://vimeo.com/XXXXXXX
      </p>
    </div>
  );
}
