import { createClient } from "@supabase/supabase-js";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

function getUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
}

export function supabase() {
  return createClient(getUrl(), getAnonKey());
}

export function supabaseAdmin() {
  return createClient(getUrl(), process.env.SUPABASE_SERVICE_ROLE_KEY ?? getAnonKey());
}
