import type { VideoContent, VideoConfig } from "@/types/blocks";

function toEmbedUrl(url: string, autoplay: boolean): string | null {
  try {
    const u = new URL(url);
    // YouTube
    const ytId = u.searchParams.get("v") ?? (u.hostname === "youtu.be" ? u.pathname.slice(1) : null);
    if (ytId) {
      const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
      if (autoplay) { params.set("autoplay", "1"); params.set("mute", "1"); }
      return `https://www.youtube.com/embed/${ytId}?${params}`;
    }
    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const vimeoId = u.pathname.split("/").filter(Boolean).pop();
      if (vimeoId) {
        const params = new URLSearchParams({ title: "0", byline: "0", portrait: "0" });
        if (autoplay) { params.set("autoplay", "1"); params.set("muted", "1"); }
        return `https://player.vimeo.com/video/${vimeoId}?${params}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideoBlock({ content, config }: { content: VideoContent; config: VideoConfig }) {
  if (!content.url) return null;
  const embed = toEmbedUrl(content.url, config.autoplay ?? false);
  if (!embed) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[4px]" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={embed}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
