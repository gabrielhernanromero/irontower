"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email o contraseña incorrectos.");
    } else {
      router.push("/admin/posts");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 100%)" }}>
      <div className="bg-white rounded-[4px] p-10 w-full max-w-[420px] shadow-xl">
        <div className="text-center mb-8">
          <p className="font-condensed font-black text-2xl tracking-wide mb-1">
            IRON<span style={{ color: "#E8721C" }}>TOWER</span>
          </p>
          <p className="font-body text-brand-muted text-sm">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="font-body text-sm text-brand-ink font-medium block mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-sm text-brand-ink focus:outline-none focus:border-brand-blue-dark transition-colors"
              placeholder="admin@irontower.com"
            />
          </div>

          <div>
            <label className="font-body text-sm text-brand-ink font-medium block mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-brand-light-border rounded-[3px] px-4 py-3 font-body text-sm text-brand-ink focus:outline-none focus:border-brand-blue-dark transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-red-600 bg-red-50 px-4 py-3 rounded-[3px]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-condensed font-bold text-[14px] tracking-[0.08em] uppercase text-white py-4 rounded-[3px] transition-opacity disabled:opacity-60"
            style={{ background: "linear-gradient(160deg, #0e4d7a 0%, #0a3a5c 100%)" }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
