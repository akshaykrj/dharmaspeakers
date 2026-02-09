"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<
    "request" | "set_password"
  >("request");
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
        await finishLogin();
      }
    };

    void init();
  }, []);

  const startOAuth = async (
    provider: "google" | "azure"
  ) => {
    setOauthLoading(provider);
    setError(null);
    localStorage.setItem("dsb:pendingRole", "requestor");

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
    setError(null);
    localStorage.setItem("dsb:pendingName", name);
    setStep("set_password");
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const pendingName =
      localStorage.getItem("dsb:pendingName") || name;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: pendingName || null,
          role: "requestor",
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    localStorage.removeItem("dsb:pendingName");
    router.push("/login");
  };

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-xl border p-8">
        <h1 className="text-2xl font-semibold mb-6">
          Create an account
        </h1>

        {step === "request" && (
          <>
            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                type="button"
                aria-label="Continue with Google"
                disabled={!!oauthLoading}
                onClick={() => startOAuth("google")}
                className="h-11 w-11 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.73 1.22 9.23 3.63l6.86-6.86C36.07 2.43 30.4 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.4 13.04 17.73 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.1 24.5c0-1.6-.14-3.13-.4-4.6H24v9.02h12.46c-.54 2.9-2.18 5.36-4.66 7.02l7.2 5.58c4.2-3.88 6.6-9.6 6.6-17.02z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.54 28.02A14.5 14.5 0 0 1 9.5 24c0-1.4.2-2.77.54-4.02l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.98-6.2z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.4 0 11.77-2.1 15.7-5.7l-7.2-5.58c-2 1.35-4.56 2.16-8.5 2.16-6.27 0-11.6-3.54-13.46-8.68l-7.98 6.2C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Continue with Outlook"
                disabled={!!oauthLoading}
                onClick={() => startOAuth("azure")}
                className="h-11 w-11 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path fill="#F25022" d="M2 2h9v9H2z" />
                  <path fill="#7FBA00" d="M13 2h9v9h-9z" />
                  <path fill="#00A4EF" d="M2 13h9v9H2z" />
                  <path fill="#FFB900" d="M13 13h9v9h-9z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span>or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </>
        )}

        {step === "request" && (
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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-[#b63a32] text-white py-2 rounded"
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </form>
        )}

        {step === "set_password" && (
          <form onSubmit={handleSetPassword} className="space-y-5">
            <input
              type="password"
              placeholder="Create a password"
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
              {loading ? "Saving..." : "Set password"}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#b63a32] underline underline-offset-4"
          >
            Log in
          </a>
        </p>

        <p className="mt-3 text-sm text-gray-700 text-center">
          Speakers should apply via{" "}
          <a
            href="/join"
            className="text-[#b63a32] underline underline-offset-4"
          >
            Join as Speaker
          </a>
          .
        </p>
      </div>
    </main>
  );
}
