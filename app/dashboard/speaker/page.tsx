"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name: string;
  photo_url: string;
  gender: string;
  date_of_birth: string;
  email: string;
  phone_whatsapp: string;
  location: string;
  preferred_time_zone: string;
  current_designation: string;
  affiliated_organizations: string;
  years_of_experience: string;
  languages_spoken: string[];
  training_lineage: string;
  academic_qualifications: string;
  core_knowledge_domains: string[];
  sub_domains: string[];
  key_publications: string;
  delivery_modes: string[];
  experience_level: string;
  preferred_audience: string[];
  preferred_event_formats: string[];
  languages_for_delivery: string[];
  presentation_style: string;
  tech_proficiency: string;
  availability_type: string;
  availability_notes: string;
  preferred_notice_period: string;
  willing_to_travel: string;
  travel_restrictions: string;
  online_ready: boolean;
  affiliations_declared: string;
  public_alignment: string;
  conflict_of_interest: string;
  ethical_commitment: boolean;
  short_bio: string;
  detailed_bio: string;
  talk_topics: string[];
  sample_talk_links: string;
  media_mentions: string;
};

const EMPTY: Profile = {
  full_name: "",
  photo_url: "",
  gender: "",
  date_of_birth: "",
  email: "",
  phone_whatsapp: "",
  location: "",
  preferred_time_zone: "",
  current_designation: "",
  affiliated_organizations: "",
  years_of_experience: "",
  languages_spoken: [],
  training_lineage: "",
  academic_qualifications: "",
  core_knowledge_domains: [],
  sub_domains: [],
  key_publications: "",
  delivery_modes: [],
  experience_level: "",
  preferred_audience: [],
  preferred_event_formats: [],
  languages_for_delivery: [],
  presentation_style: "",
  tech_proficiency: "",
  availability_type: "",
  availability_notes: "",
  preferred_notice_period: "",
  willing_to_travel: "",
  travel_restrictions: "",
  online_ready: false,
  affiliations_declared: "",
  public_alignment: "",
  conflict_of_interest: "",
  ethical_commitment: false,
  short_bio: "",
  detailed_bio: "",
  talk_topics: [],
  sample_talk_links: "",
  media_mentions: "",
};

function arrToStr(val: string[] | null | undefined) {
  return (val ?? []).join(", ");
}

function strToArr(val: string) {
  return val
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-[#2B2B2B]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-[#E6E4DF] bg-white px-3 py-2 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4A441]";

const textareaCls =
  "w-full rounded-md border border-[#E6E4DF] bg-white px-3 py-2 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#D4A441] resize-y";

export default function SpeakerDashboard() {
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setError("Please log in as a speaker.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/speaker/profile", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Unable to load profile.");
        setLoading(false);
        return;
      }

      const d = json.data ?? {};
      setProfile({
        full_name: d.full_name ?? "",
        photo_url: d.photo_url ?? "",
        gender: d.gender ?? "",
        date_of_birth: d.date_of_birth ?? "",
        email: d.email ?? "",
        phone_whatsapp: d.phone_whatsapp ?? "",
        location: d.location ?? "",
        preferred_time_zone: d.preferred_time_zone ?? "",
        current_designation: d.current_designation ?? "",
        affiliated_organizations: d.affiliated_organizations ?? "",
        years_of_experience: d.years_of_experience?.toString() ?? "",
        languages_spoken: d.languages_spoken ?? [],
        training_lineage: d.training_lineage ?? "",
        academic_qualifications: d.academic_qualifications ?? "",
        core_knowledge_domains: d.core_knowledge_domains ?? [],
        sub_domains: d.sub_domains ?? [],
        key_publications: d.key_publications ?? "",
        delivery_modes: d.delivery_modes ?? [],
        experience_level: d.experience_level ?? "",
        preferred_audience: d.preferred_audience ?? [],
        preferred_event_formats: d.preferred_event_formats ?? [],
        languages_for_delivery: d.languages_for_delivery ?? [],
        presentation_style: d.presentation_style ?? "",
        tech_proficiency: d.tech_proficiency ?? "",
        availability_type: d.availability_type ?? "",
        availability_notes: d.availability_notes ?? "",
        preferred_notice_period: d.preferred_notice_period ?? "",
        willing_to_travel: d.willing_to_travel ?? "",
        travel_restrictions: d.travel_restrictions ?? "",
        online_ready: d.online_ready ?? false,
        affiliations_declared: d.affiliations_declared ?? "",
        public_alignment: d.public_alignment ?? "",
        conflict_of_interest: d.conflict_of_interest ?? "",
        ethical_commitment: d.ethical_commitment ?? false,
        short_bio: d.short_bio ?? "",
        detailed_bio: d.detailed_bio ?? "",
        talk_topics: d.talk_topics ?? [],
        sample_talk_links: d.sample_talk_links ?? "",
        media_mentions: d.media_mentions ?? "",
      });
      setLoading(false);
    };

    void load();
  }, []);

  const set = (key: keyof Profile, value: unknown) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setError("Session expired. Please log in again.");
      setSaving(false);
      return;
    }

    const payload = {
      ...profile,
      years_of_experience: profile.years_of_experience
        ? parseInt(profile.years_of_experience, 10)
        : null,
    };

    const res = await fetch("/api/speaker/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Failed to save.");
    } else {
      setSaved(true);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-600">Loading your profile…</p>
      </main>
    );
  }

  if (error && !profile.full_name) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-serif mb-2">Speaker Profile</h1>
        <p className="text-gray-600">
          Keep your details up to date. Changes are reflected across the platform.
        </p>
      </div>

      <div className="space-y-14">

        {/* Personal Information */}
        <section>
          <h2 className="text-xl font-serif mb-6 pb-2 border-b border-[#E6E4DF]">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Full Name">
              <input className={inputCls} value={profile.full_name} onChange={(e) => set("full_name", e.target.value)} />
            </Field>
            <Field label="Gender">
              <input className={inputCls} value={profile.gender} onChange={(e) => set("gender", e.target.value)} />
            </Field>
            <Field label="Date of Birth">
              <input type="date" className={inputCls} value={profile.date_of_birth} onChange={(e) => set("date_of_birth", e.target.value)} />
            </Field>
            <Field label="Email">
              <input type="email" className={inputCls} value={profile.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Phone / WhatsApp">
              <input className={inputCls} value={profile.phone_whatsapp} onChange={(e) => set("phone_whatsapp", e.target.value)} />
            </Field>
            <Field label="Location">
              <input className={inputCls} value={profile.location} onChange={(e) => set("location", e.target.value)} />
            </Field>
            <Field label="Preferred Time Zone">
              <input className={inputCls} value={profile.preferred_time_zone} onChange={(e) => set("preferred_time_zone", e.target.value)} />
            </Field>
            <Field label="Photo URL">
              <input className={inputCls} value={profile.photo_url} onChange={(e) => set("photo_url", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Professional Details */}
        <section>
          <h2 className="text-xl font-serif mb-6 pb-2 border-b border-[#E6E4DF]">
            Professional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Current Designation">
              <input className={inputCls} value={profile.current_designation} onChange={(e) => set("current_designation", e.target.value)} />
            </Field>
            <Field label="Years of Experience">
              <input type="number" className={inputCls} value={profile.years_of_experience} onChange={(e) => set("years_of_experience", e.target.value)} />
            </Field>
            <Field label="Experience Level">
              <input className={inputCls} value={profile.experience_level} onChange={(e) => set("experience_level", e.target.value)} placeholder="e.g. Emerging, Established, Senior" />
            </Field>
            <Field label="Training Lineage">
              <input className={inputCls} value={profile.training_lineage} onChange={(e) => set("training_lineage", e.target.value)} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Academic Qualifications">
                <textarea rows={3} className={textareaCls} value={profile.academic_qualifications} onChange={(e) => set("academic_qualifications", e.target.value)} />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Affiliated Organizations">
                <textarea rows={3} className={textareaCls} value={profile.affiliated_organizations} onChange={(e) => set("affiliated_organizations", e.target.value)} />
              </Field>
            </div>
          </div>
        </section>

        {/* Knowledge & Speaking */}
        <section>
          <h2 className="text-xl font-serif mb-6 pb-2 border-b border-[#E6E4DF]">
            Knowledge & Speaking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Core Knowledge Domains (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.core_knowledge_domains)} onChange={(e) => set("core_knowledge_domains", strToArr(e.target.value))} />
            </Field>
            <Field label="Sub-Domains (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.sub_domains)} onChange={(e) => set("sub_domains", strToArr(e.target.value))} />
            </Field>
            <Field label="Languages Spoken (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.languages_spoken)} onChange={(e) => set("languages_spoken", strToArr(e.target.value))} />
            </Field>
            <Field label="Languages for Delivery (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.languages_for_delivery)} onChange={(e) => set("languages_for_delivery", strToArr(e.target.value))} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Key Publications (one per line)">
                <textarea rows={4} className={textareaCls} value={profile.key_publications} onChange={(e) => set("key_publications", e.target.value)} />
              </Field>
            </div>
          </div>
        </section>

        {/* Engagement Preferences */}
        <section>
          <h2 className="text-xl font-serif mb-6 pb-2 border-b border-[#E6E4DF]">
            Engagement Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Delivery Modes (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.delivery_modes)} onChange={(e) => set("delivery_modes", strToArr(e.target.value))} placeholder="e.g. In-person, Online, Hybrid" />
            </Field>
            <Field label="Preferred Event Formats (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.preferred_event_formats)} onChange={(e) => set("preferred_event_formats", strToArr(e.target.value))} placeholder="e.g. Lecture, Panel, Workshop" />
            </Field>
            <Field label="Preferred Audience (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.preferred_audience)} onChange={(e) => set("preferred_audience", strToArr(e.target.value))} placeholder="e.g. Academic, Corporate, General Public" />
            </Field>
            <Field label="Presentation Style">
              <input className={inputCls} value={profile.presentation_style} onChange={(e) => set("presentation_style", e.target.value)} />
            </Field>
            <Field label="Tech Proficiency">
              <input className={inputCls} value={profile.tech_proficiency} onChange={(e) => set("tech_proficiency", e.target.value)} placeholder="e.g. Basic, Intermediate, Advanced" />
            </Field>
          </div>
        </section>

        {/* Availability */}
        <section>
          <h2 className="text-xl font-serif mb-6 pb-2 border-b border-[#E6E4DF]">
            Availability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Availability Type">
              <input className={inputCls} value={profile.availability_type} onChange={(e) => set("availability_type", e.target.value)} placeholder="e.g. Full-time, Part-time, On request" />
            </Field>
            <Field label="Preferred Notice Period">
              <input className={inputCls} value={profile.preferred_notice_period} onChange={(e) => set("preferred_notice_period", e.target.value)} placeholder="e.g. 2 weeks, 1 month" />
            </Field>
            <Field label="Willing to Travel">
              <input className={inputCls} value={profile.willing_to_travel} onChange={(e) => set("willing_to_travel", e.target.value)} placeholder="e.g. Yes, Domestic only, No" />
            </Field>
            <Field label="Travel Restrictions">
              <input className={inputCls} value={profile.travel_restrictions} onChange={(e) => set("travel_restrictions", e.target.value)} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Availability Notes">
                <textarea rows={3} className={textareaCls} value={profile.availability_notes} onChange={(e) => set("availability_notes", e.target.value)} />
              </Field>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="online_ready"
                checked={profile.online_ready}
                onChange={(e) => set("online_ready", e.target.checked)}
                className="h-4 w-4 rounded border-[#E6E4DF] accent-[#D4A441]"
              />
              <label htmlFor="online_ready" className="text-sm text-[#2B2B2B]">
                Online ready (equipment & setup in place)
              </label>
            </div>
          </div>
        </section>

        {/* Public Profile */}
        <section>
          <h2 className="text-xl font-serif mb-6 pb-2 border-b border-[#E6E4DF]">
            Public Profile
          </h2>
          <div className="space-y-6">
            <Field label="Short Bio">
              <textarea rows={3} className={textareaCls} value={profile.short_bio} onChange={(e) => set("short_bio", e.target.value)} />
            </Field>
            <Field label="Detailed Bio">
              <textarea rows={6} className={textareaCls} value={profile.detailed_bio} onChange={(e) => set("detailed_bio", e.target.value)} />
            </Field>
            <Field label="Talk Topics (comma-separated)">
              <input className={inputCls} value={arrToStr(profile.talk_topics)} onChange={(e) => set("talk_topics", strToArr(e.target.value))} />
            </Field>
            <Field label="Sample Talk Links (one per line)">
              <textarea rows={4} className={textareaCls} value={profile.sample_talk_links} onChange={(e) => set("sample_talk_links", e.target.value)} />
            </Field>
            <Field label="Media Mentions (one per line)">
              <textarea rows={4} className={textareaCls} value={profile.media_mentions} onChange={(e) => set("media_mentions", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Ethics & Affiliations */}
        <section>
          <h2 className="text-xl font-serif mb-6 pb-2 border-b border-[#E6E4DF]">
            Ethics & Affiliations
          </h2>
          <div className="space-y-6">
            <Field label="Affiliations Declared">
              <textarea rows={3} className={textareaCls} value={profile.affiliations_declared} onChange={(e) => set("affiliations_declared", e.target.value)} />
            </Field>
            <Field label="Public Alignment">
              <textarea rows={3} className={textareaCls} value={profile.public_alignment} onChange={(e) => set("public_alignment", e.target.value)} />
            </Field>
            <Field label="Conflict of Interest">
              <textarea rows={3} className={textareaCls} value={profile.conflict_of_interest} onChange={(e) => set("conflict_of_interest", e.target.value)} />
            </Field>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="ethical_commitment"
                checked={profile.ethical_commitment}
                onChange={(e) => set("ethical_commitment", e.target.checked)}
                className="h-4 w-4 rounded border-[#E6E4DF] accent-[#D4A441]"
              />
              <label htmlFor="ethical_commitment" className="text-sm text-[#2B2B2B]">
                I confirm my commitment to DSB's ethical standards
              </label>
            </div>
          </div>
        </section>
      </div>

      {/* Save */}
      <div className="mt-12 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-[#D4A441] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#C2953A] disabled:opacity-50 transition"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {saved && <p className="text-sm text-green-700">Saved successfully.</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </main>
  );
}
