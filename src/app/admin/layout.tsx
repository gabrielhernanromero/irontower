import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session && typeof window === "undefined") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen" style={{ background: "#f0f6fb" }}>
      {/* Top bar */}
      <header className="border-b bg-white px-6 py-4 flex items-center justify-between" style={{ borderColor: "#d0e8f7" }}>
        <div className="flex items-center gap-4">
          <a href="/" className="font-condensed font-black text-lg tracking-wide">
            IRON<span style={{ color: "#E8721C" }}>TOWER</span>
          </a>
          <span className="font-body text-xs text-brand-muted">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/blog" target="_blank" className="font-body text-sm text-brand-mid hover:text-brand-ink transition-colors">
            Ver blog →
          </a>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="font-body text-sm text-brand-mid hover:text-brand-ink transition-colors"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1100px] mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
