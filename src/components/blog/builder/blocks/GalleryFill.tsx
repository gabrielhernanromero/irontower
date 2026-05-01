"use client";
import { useRef } from "react";
import Image from "next/image";
import type { GalleryContent } from "@/types/blocks";
import { uploadImage } from "../uploadImage";

interface Props { content: GalleryContent; onChange: (c: GalleryContent) => void }

export default function GalleryFill({ content, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const images = content.images ?? [];

  const upload = async (files: FileList) => {
    const urls = await Promise.all(Array.from(files).map(uploadImage));
    onChange({ images: [...images, ...urls] });
  };

  const remove = (i: number) => onChange({ images: images.filter((_, idx) => idx !== i) });

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <div key={src + i} className="relative group">
            <div className="relative h-16 rounded-[3px] overflow-hidden">
              <Image src={src} alt={`Foto ${i + 1}`} fill className="object-cover" />
            </div>
            <button type="button" onClick={() => remove(i)}
              className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              ×
            </button>
          </div>
        ))}
        <div className="h-16 rounded-[3px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ background: "#f0f6fb", border: "2px dashed #d0e8f7" }}
          onClick={() => ref.current?.click()}
        >
          <span className="font-body text-2xl text-brand-muted">+</span>
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) upload(e.target.files); e.target.value = ""; }} />
    </div>
  );
}
