"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RequestSpeakerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState<
    "speaker" | "requestor" | "admin" | null
  >(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [preferredSpeaker, setPreferredSpeaker] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const requestedSpeaker =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get(
              "speaker"
            ) || ""
          : "";
      setPreferredSpeaker(requestedSpeaker);

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        const nextTarget = requestedSpeaker
          ? `/request?speaker=${encodeURIComponent(
              requestedSpeaker
            )}`
          : "/request";
        router.push(
          `/login?next=${encodeURIComponent(nextTarget)}`
        );
        return;
      }
      const userRole = session?.user?.user_metadata
        ?.role as "speaker" | "requestor" | "admin" | undefined;
      setRole(userRole ?? null);
      setUserEmail(session?.user?.email || "");
      const name =
        (session?.user?.user_metadata?.name as
          | string
          | undefined) ||
        (session?.user?.user_metadata?.full_name as
          | string
          | undefined) ||
        "";
      setUserName(name);
    };
    void init();
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/request-speaker", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setSubmitError(body.error || "Something went wrong. Please try again.");
      return;
    }

    if (res.ok) {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "142bb8a6-f864-4646-8b21-5279c2df2497",
          subject: "New Speaker Request",
          from_name: payload.institution_name || "DSB Website",
          ...payload,
        }),
      }).catch(console.error);
      setSubmitted(true);
      form.reset();
    }
  }

  return (
    <main className="bg-[#faf9f6] text-[#111111]">
      {/* Page container */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-24">
        
        {/* Title */}
        <h1 className="text-4xl font-serif mb-6">
          Request a Speaker
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed text-gray-800 max-w-3xl mb-16">
          The Dharma Speakers Bureau facilitates meaningful engagements by
          connecting institutions with credible Dharmic speakers across
          disciplines, traditions, and contemporary contexts.
        </p>

        {/* Form */}
        <section className="max-w-3xl">
          <h2 className="text-2xl font-serif mb-8">
            Speaker Request Form
          </h2>

          {role !== "requestor" && role !== "admin" ? (
            <div className="space-y-3 text-gray-700">
              <p>
                To submit a speaker request, you need a <strong>requestor account</strong>.
                This helps us track your enquiry and follow up with you directly.
              </p>
              <p className="flex flex-wrap gap-3 mt-4">
                <a
                  href="/signup"
                  className="inline-block rounded-md bg-[#D4A441] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#C2953A] transition"
                >
                  Create a requestor account
                </a>
                <a
                  href="/login"
                  className="inline-block rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Log in
                </a>
              </p>
            </div>
          ) : submitted ? (
            <p className="text-green-700 text-lg">
              Thank you for your request. Our team will review the details and
              get back to you shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                name="contact_person"
                placeholder="Contact Person"
                className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-gray-600"
                value={userName}
                disabled
                readOnly
              />
              <input
                type="hidden"
                name="contact_person"
                value={userName}
              />

              <input
                name="email"
                type="email"
                placeholder="Contact Email"
                className="w-full border border-gray-300 p-3 rounded bg-gray-100 text-gray-600"
                value={userEmail}
                disabled
                readOnly
              />
              <input
                type="hidden"
                name="email"
                value={userEmail}
              />

              <input
                name="institution_name"
                required
                placeholder="Institution Name"
                className="w-full border border-gray-300 p-3 rounded"
              />

              <input
                name="engagement_type"
                placeholder="Type of Engagement (lecture, workshop, panel, retreat, etc.)"
                className="w-full border border-gray-300 p-3 rounded"
              />

              <input
                name="audience"
                placeholder="Audience (students, professionals, general public, etc.)"
                className="w-full border border-gray-300 p-3 rounded"
              />

              <input
                name="date_location"
                placeholder="Date and Location"
                className="w-full border border-gray-300 p-3 rounded"
              />

              <input
                name="preferred_speaker"
                placeholder="Preferred Speaker or Domain"
                className="w-full border border-gray-300 p-3 rounded"
                value={preferredSpeaker}
                onChange={(e) =>
                  setPreferredSpeaker(e.target.value)
                }
              />

              <input
                name="topic"
                placeholder="Topic or Theme"
                className="w-full border border-gray-300 p-3 rounded"
              />

              <textarea
                name="additional_notes"
                placeholder="Additional Notes"
                className="w-full border border-gray-300 p-3 rounded h-28"
              />

              <input
                name="budget"
                placeholder="Budget (optional)"
                className="w-full border border-gray-300 p-3 rounded"
              />

              {submitError && (
                <p className="text-red-600 text-sm">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#D4A441] text-white px-8 py-3 rounded hover:bg-[#C2953A] transition"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>

            </form>
          )}
        </section>
      </section>
    </main>
  );
}
