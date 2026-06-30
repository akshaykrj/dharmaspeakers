"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type SpeakerRequest = {
  id: string;
  institution_name: string | null;
  contact_person: string | null;
  email: string | null;
  preferred_speaker: string | null;
  topic: string | null;
  date_location: string | null;
  status: string | null;
  created_at: string | null;
  engagement_type: string | null;
  audience: string | null;
  budget: string | null;
  additional_notes: string | null;
};

type SpeakerApplication = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  professional_details: string | null;
  academic_background: string | null;
  domains: string | null;
  speaking_details: string | null;
  engagement_preferences: string | null;
  affiliations_ethics: string | null;
  statement: string | null;
  status: string | null;
  created_at: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-[#F1ECE2] text-[#6A5D49]",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<SpeakerRequest[]>([]);
  const [applications, setApplications] = useState<
    SpeakerApplication[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (
    type: "speaker-requests" | "speaker-applications",
    id: string,
    status: string
  ) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;

    setUpdating(id);
    const res = await fetch(`/api/admin/${type}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ id, status }),
    });
    setUpdating(null);

    if (!res.ok) return;

    if (type === "speaker-requests") {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } else {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.access_token) {
          setError("Please log in with an admin account.");
          setLoading(false);
          return;
        }

        const role = session.user.user_metadata?.role;
        if (role !== "admin") {
          setError("This dashboard is available to admins only.");
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${session.access_token}`,
        };

        const [requestsRes, applicationsRes] = await Promise.all([
          fetch("/api/admin/speaker-requests", { headers }),
          fetch("/api/admin/speaker-applications", { headers }),
        ]);

        const [requestsJson, applicationsJson] = await Promise.all([
          requestsRes.json(),
          applicationsRes.json(),
        ]);

        if (!requestsRes.ok) {
          setError(
            requestsJson.error || "Unable to load speaker requests."
          );
          setLoading(false);
          return;
        }

        if (!applicationsRes.ok) {
          setError(
            applicationsJson.error ||
              "Unable to load speaker applications."
          );
          setLoading(false);
          return;
        }

        setRequests(requestsJson.data || []);
        setApplications(applicationsJson.data || []);
        setLoading(false);
      } catch {
        setError("Unable to load dashboard. Please try again.");
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-serif mb-3">
          Admin Dashboard
        </h1>
        <p className="text-gray-700 max-w-3xl">
          View and review speaker applications and engagement requests submitted through the platform.
        </p>
      </div>

      {loading && (
        <p className="text-gray-600">Loading requests...</p>
      )}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-14">
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-serif">
                Join as Speaker Applications
              </h2>
              <p className="mt-2 text-gray-600">
                New speaker onboarding submissions from the public
                form.
              </p>
            </div>

            {applications.length === 0 ? (
              <p className="text-gray-600">
                No speaker applications yet.
              </p>
            ) : (
              <div className="space-y-5">
                {applications.map((app) => (
                  <section
                    key={app.id}
                    className="rounded-md border border-[#E6E4DF] bg-white p-6"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-serif text-[#111111]">
                          {app.name || "Name not set"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {app.created_at
                            ? new Date(app.created_at).toLocaleString()
                            : "Date not available"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex w-fit rounded-full px-3 py-1 text-sm ${STATUS_STYLES[app.status ?? "pending"] ?? STATUS_STYLES.pending}`}>
                          {STATUS_LABELS[app.status ?? "pending"] ?? app.status}
                        </span>
                        {app.status !== "approved" && (
                          <button
                            disabled={updating === app.id}
                            onClick={() => updateStatus("speaker-applications", app.id, "approved")}
                            className="rounded px-3 py-1 text-sm bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                        {app.status !== "rejected" && (
                          <button
                            disabled={updating === app.id}
                            onClick={() => updateStatus("speaker-applications", app.id, "rejected")}
                            className="rounded px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        )}
                        {app.status !== "pending" && (
                          <button
                            disabled={updating === app.id}
                            onClick={() => updateStatus("speaker-applications", app.id, "pending")}
                            className="rounded px-3 py-1 text-sm bg-[#F1ECE2] text-[#6A5D49] hover:bg-[#e8e0d0] disabled:opacity-50"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 text-[15px] text-gray-700 md:grid-cols-2">
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Email:
                        </span>{" "}
                        {app.email || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Phone:
                        </span>{" "}
                        {app.phone || "Not specified"}
                      </p>
                    </div>

                    {app.professional_details && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Professional Details
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                          {app.professional_details}
                        </p>
                      </div>
                    )}

                    {app.academic_background && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Academic Background
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                          {app.academic_background}
                        </p>
                      </div>
                    )}

                    {app.domains && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Domains
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                          {app.domains}
                        </p>
                      </div>
                    )}

                    {app.speaking_details && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Speaking Details
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                          {app.speaking_details}
                        </p>
                      </div>
                    )}

                    {app.engagement_preferences && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Engagement Preferences
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                          {app.engagement_preferences}
                        </p>
                      </div>
                    )}

                    {app.affiliations_ethics && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Affiliations & Ethics
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                          {app.affiliations_ethics}
                        </p>
                      </div>
                    )}

                    {app.statement && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Statement
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                          {app.statement}
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-serif">
                Speaker Requests
              </h2>
              <p className="mt-2 text-gray-600">
                Requests submitted by institutions and requestors.
              </p>
            </div>

            {requests.length === 0 ? (
              <p className="text-gray-600">
                No speaker requests yet.
              </p>
            ) : (
              <div className="space-y-5">
                {requests.map((req) => (
                  <section
                    key={req.id}
                    className="rounded-md border border-[#E6E4DF] bg-white p-6"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-serif text-[#111111]">
                          {req.institution_name ||
                            "Institution not set"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {req.created_at
                            ? new Date(req.created_at).toLocaleString()
                            : "Date not available"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex w-fit rounded-full px-3 py-1 text-sm ${STATUS_STYLES[req.status ?? "pending"] ?? STATUS_STYLES.pending}`}>
                          {STATUS_LABELS[req.status ?? "pending"] ?? req.status}
                        </span>
                        {req.status !== "approved" && (
                          <button
                            disabled={updating === req.id}
                            onClick={() => updateStatus("speaker-requests", req.id, "approved")}
                            className="rounded px-3 py-1 text-sm bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                        {req.status !== "rejected" && (
                          <button
                            disabled={updating === req.id}
                            onClick={() => updateStatus("speaker-requests", req.id, "rejected")}
                            className="rounded px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        )}
                        {req.status !== "pending" && (
                          <button
                            disabled={updating === req.id}
                            onClick={() => updateStatus("speaker-requests", req.id, "pending")}
                            className="rounded px-3 py-1 text-sm bg-[#F1ECE2] text-[#6A5D49] hover:bg-[#e8e0d0] disabled:opacity-50"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 text-[15px] text-gray-700 md:grid-cols-2">
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Contact Person:
                        </span>{" "}
                        {req.contact_person || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Email:
                        </span>{" "}
                        {req.email || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Preferred Speaker:
                        </span>{" "}
                        {req.preferred_speaker || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Topic:
                        </span>{" "}
                        {req.topic || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Date / Location:
                        </span>{" "}
                        {req.date_location || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Engagement Type:
                        </span>{" "}
                        {req.engagement_type || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Audience:
                        </span>{" "}
                        {req.audience || "Not specified"}
                      </p>
                      <p>
                        <span className="font-medium text-[#2B2B2B]">
                          Budget:
                        </span>{" "}
                        {req.budget || "Not specified"}
                      </p>
                    </div>

                    {req.additional_notes && (
                      <div className="mt-5 border-t border-[#EFECE6] pt-4">
                        <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-[#6A5D49]">
                          Additional Notes
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-700">
                          {req.additional_notes}
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
