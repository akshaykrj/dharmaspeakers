"use client";

import { useState } from "react";

export default function RequestSpeakerPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/request-speaker", {
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

          {submitted ? (
            <p className="text-green-700 text-lg">
              Thank you for your request. Our team will review the details and
              get back to you shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                name="institution_name"
                required
                placeholder="Institution Name"
                className="w-full border border-gray-300 p-3 rounded"
              />

              <input
                name="contact_person"
                required
                placeholder="Contact Person"
                className="w-full border border-gray-300 p-3 rounded"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Contact Email"
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
