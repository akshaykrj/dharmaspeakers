"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"speaker" | "requestor">("speaker");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
