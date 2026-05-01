"use client";
import dynamic from "next/dynamic";
import type { TextContent } from "@/types/blocks";

const RichTextEditor = dynamic(() => import("@/components/blog/RichTextEditor"), { ssr: false, loading: () => <div className="h-32 bg-brand-light-bg rounded-[3px] animate-pulse" /> });

interface Props { content: TextContent; onChange: (c: TextContent) => void }

export default function TextFill({ content, onChange }: Props) {
  return <RichTextEditor content={content.html ?? ""} onChange={(html) => onChange({ html })} />;
}
