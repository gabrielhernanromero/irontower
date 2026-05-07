import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, content, tags, cover_image, published, template_id, blocks } = body;

  if (!title || !slug) return NextResponse.json({ error: "Título y slug son obligatorios." }, { status: 400 });

  const { data, error } = await supabaseAdmin()
    .from("posts")
    .insert([{ title, slug, excerpt, content, tags, cover_image, published, template_id, blocks }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
