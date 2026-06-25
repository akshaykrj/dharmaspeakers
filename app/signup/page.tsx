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
