"use client";
import { useEffect, useState } from "react";

interface TocItem { id: string; text: string; level: number }

export default function TableOfContents({ contentSelector = ".post-content" }: { contentSelector?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const container = document.querySelector(contentSelector);
    if (!container) return;
    const headings = Array.from(container.querySelectorAll("h2, h3")) as HTMLElement[];
    const toc: TocItem[] = headings.map((el, i) => {
      if (!el.id) el.id = `toc-${i}`;
      return { id: el.id, text: el.textContent ?? "", level: el.tagName === "H2" ? 2 : 3 };
    });
    setItems(toc);
  }, [contentSelector]);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "0px 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav className="hidden xl:block sticky top-24 self-start w-52 shrink-0">
      <p className="font-condensed font-bold text-brand-blue text-xs uppercase tracking-widest mb-3">Contenido</p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block font-body text-xs leading-snug py-0.5 border-l-2 pl-3 transition-colors ${
                active === item.id
                  ? "border-brand-orange text-brand-ink font-semibold"
                  : "border-transparent text-brand-mid hover:text-brand-ink"
              } ${item.level === 3 ? "pl-5" : ""}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
