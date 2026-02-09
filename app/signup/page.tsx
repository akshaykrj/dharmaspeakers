"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"speaker" | "requestor">("speaker");
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
    let resolvedRole = session.user.user_metadata?.role as
      | "speaker"
      | "requestor"
      | undefined;

    if (!resolvedRole && pendingRole) {
      const { error: updateError } =
        await supabase.auth.updateUser({
          data: { role: pendingRole },
        });
      if (!updateError) {
        resolvedRole = pendingRole as "speaker" | "requestor";
      }
      localStorage.removeItem("dsb:pendingRole");
    }

    if (resolvedRole === "speaker") {
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
    localStorage.setItem("dsb:pendingRole", role);

    const { error: oauthError } =
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/signup`,
        },
      });

    if (oauthError) {
      setError(oauthError.message);
      setOauthLoading(null);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login");
  };

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-xl border p-8">
        <h1 className="text-2xl font-semibold mb-6">Create an account</h1>

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

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            placeholder="Name"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <div className="flex gap-4 text-sm">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                checked={role === "speaker"}
                onChange={() => setRole("speaker")}
              />
              Speaker
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                checked={role === "requestor"}
                onChange={() => setRole("requestor")}
              />
              Requestor
            </label>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#b63a32] text-white py-2 rounded"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
}
