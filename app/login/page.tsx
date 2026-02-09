"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<
    "google" | "azure" | null
  >(null);

  const finishLogin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const pendingRole = localStorage.getItem("dsb:pendingRole");
    let role = session.user.user_metadata?.role as
      | "speaker"
      | "requestor"
      | undefined;

    if (!role && pendingRole) {
      const { error: updateError } =
        await supabase.auth.updateUser({
          data: { role: pendingRole },
        });
      if (!updateError) {
        role = pendingRole as "speaker" | "requestor";
      }
      localStorage.removeItem("dsb:pendingRole");
    }

    if (role === "speaker") {
      router.push("/dashboard/speaker");
    } else {
      router.push("/dashboard/requestor");
    }
  };

  useEffect(() => {
    const init = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const errorDescription = url.searchParams.get(
        "error_description"
      );

      if (errorDescription) {
        setError(errorDescription);
        return;
      }

      if (code) {
        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setError(exchangeError.message);
          return;
        }
      }

      await finishLogin();
    };

    void init();
  }, []);

  const startOAuth = async (
    provider: "google" | "azure"
  ) => {
    setOauthLoading(provider);
    setError(null);

    const { error: oauthError } =
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

    if (oauthError) {
      setError(oauthError.message);
      setOauthLoading(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    await finishLogin();
  };

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-xl border p-8">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <div className="space-y-4 mb-6">
          <button
            type="button"
            disabled={!!oauthLoading}
            onClick={() => startOAuth("google")}
            className="w-full border rounded px-3 py-2 bg-white hover:bg-gray-50"
          >
            {oauthLoading === "google"
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            disabled={!!oauthLoading}
            onClick={() => startOAuth("azure")}
            className="w-full border rounded px-3 py-2 bg-white hover:bg-gray-50"
          >
            {oauthLoading === "azure"
              ? "Connecting to Microsoft..."
              : "Continue with Outlook"}
          </button>

        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span>or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#b63a32] text-white py-2 rounded"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
