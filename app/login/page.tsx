"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "reset">(
    "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const finishLogin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    if (nextPath) {
      router.push(nextPath);
      return;
    }

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
      const nextParam = url.searchParams.get("next");
      if (nextParam) {
        setNextPath(nextParam);
      }
      const hashParams = new URLSearchParams(
        window.location.hash.replace("#", "")
      );
      const hashType = hashParams.get("type");
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (errorDescription) {
        setError(errorDescription);
        return;
      }

      if (
        hashType === "recovery" &&
        accessToken &&
        refreshToken
      ) {
        const { error: sessionError } =
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        if (sessionError) {
          setError(sessionError.message);
          return;
        }
        setMode("reset");
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

  const handleSendReset = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResetSent(false);

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setResetSent(true);
  };

  const handleResetPassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: updateError } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push(nextPath || "/login");
  };

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-xl border p-8">
        <h1 className="text-2xl font-semibold mb-6">
          {mode === "reset" ? "Set a new password" : "Log in"}
        </h1>

        {mode === "login" && (
          <>
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
              {resetSent && (
                <p className="text-green-700 text-sm">
                  Password reset link sent. Check your email.
                </p>
              )}

              <button
                disabled={loading}
                className="w-full bg-[#b63a32] text-white py-2 rounded"
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>

            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={handleSendReset}
                className="text-sm text-[#b63a32] underline underline-offset-4"
                disabled={!email || loading}
              >
                Forgot password?
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-600 text-center">
              New here?{" "}
              <a
                href="/signup"
                className="text-[#b63a32] underline underline-offset-4"
              >
                Sign up
              </a>
            </p>
          </>
        )}

        {mode === "reset" && (
          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
          >
            <input
              type="password"
              placeholder="Create a new password"
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
      </div>
    </main>
  );
}
