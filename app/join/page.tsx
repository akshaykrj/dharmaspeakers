"use client";

import { useState } from "react";

export default function JoinAsSpeakerPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/join-speaker", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
      e.currentTarget.reset();
    }
  }

  return (
    <main className="bg-[#faf9f6] text-[#111111]">
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-24">

        {/* Page Header */}
        <h1 className="text-4xl font-serif mb-6">
          Join as a Speaker
        </h1>

        <p className="text-lg leading-relaxed text-gray-800 max-w-3xl mb-16">
          The Dharma Speakers Bureau exists to support speakers in their work and calling
          by connecting them with the right audiences and forums, while reducing the burden
          of self-promotion and administration.
        </p>

        {/* Who / Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-2xl font-serif mb-6">Who Can Apply</h2>
            <ul className="space-y-3 text-gray-800">
              <li>Traditional scholars and acharyas</li>
              <li>Academics and IKS researchers</li>
              <li>Practitioners and artists</li>
              <li>Writers, educators, and communicators</li>
              <li>Business and leadership practitioners</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-6">What Support Looks Like</h2>
            <ul className="space-y-3 text-gray-800">
              <li>Representation</li>
              <li>Coordination</li>
              <li>Community</li>
              <li>Fair compensation</li>
              <li>Long-term association</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-16" />

        {/* Form */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-serif mb-8">
            Speaker Application Form
          </h2>

          {submitted ? (
            <p className="text-green-700 text-lg">
              Thank you for your submission. We will review your application and get back to you.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                name="name"
                required
                placeholder="Full Name"
                className="w-full border border-gray-300 p-3 rounded bg-white"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="w-full border border-gray-300 p-3 rounded bg-white"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-3 rounded bg-white"
              />

              <textarea
                name="professional_details"
                required
                placeholder="Professional Details"
                className="w-full border border-gray-300 p-3 rounded bg-white h-28"
              />

              <textarea
                name="academic_background"
                placeholder="Academic Background"
                className="w-full border border-gray-300 p-3 rounded bg-white h-24"
              />

              <textarea
                name="domains"
                placeholder="Domains of Knowledge"
                className="w-full border border-gray-300 p-3 rounded bg-white h-24"
              />

              <textarea
                name="speaking_details"
                placeholder="Speaking Experience & Formats"
                className="w-full border border-gray-300 p-3 rounded bg-white h-24"
              />

              <textarea
                name="engagement_preferences"
                placeholder="Engagement Preferences"
                className="w-full border border-gray-300 p-3 rounded bg-white h-24"
              />

              <textarea
                name="affiliations_ethics"
                placeholder="Affiliations and Ethical Commitments"
                className="w-full border border-gray-300 p-3 rounded bg-white h-24"
              />

              <textarea
                name="statement"
                required
                placeholder="Short Statement of Interest"
                className="w-full border border-gray-300 p-3 rounded bg-white h-32"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-[#D4A441] text-white px-8 py-3 rounded font-medium hover:bg-[#C2953A] transition"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
