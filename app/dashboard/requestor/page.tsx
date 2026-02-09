"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type SpeakerRequest = {
  id: string;
  email: string | null;
  preferred_speaker: string | null;
  topic: string | null;
  date_location: string | null;
  status: string | null;
  created_at: string | null;
};

export default function RequestorDashboard() {
  const [requests, setRequests] = useState<SpeakerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      const email = user?.email;
      if (!email) {
        setError("Unable to find your account email.");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("speaker_requests")
        .select(
          "id,email,preferred_speaker,topic,date_location,status,created_at"
        )
        .eq("email", email)
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    };

    void load();
  }, []);

  const { current, previous } = useMemo(() => {
    const currentStatuses = new Set([
      "new",
      "pending",
      "in_progress",
      "open",
      "active",
    ]);
    const previousStatuses = new Set([
      "completed",
      "closed",
      "cancelled",
      "canceled",
      "archived",
      "rejected",
    ]);

    const currentList: SpeakerRequest[] = [];
    const previousList: SpeakerRequest[] = [];

    for (const req of requests) {
      const status = (req.status || "").toLowerCase();
      if (previousStatuses.has(status)) {
        previousList.push(req);
      } else if (currentStatuses.has(status) || !status) {
        currentList.push(req);
      } else {
        currentList.push(req);
      }
    }

    return { current: currentList, previous: previousList };
  }, [requests]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif mb-10">
        Requestor Dashboard
      </h1>

      {loading && (
        <p className="text-gray-600">Loading requests...</p>
      )}

      {error && (
        <p className="text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-serif mb-4">
              Current Requests
            </h2>
            {current.length === 0 ? (
              <p className="text-gray-600">
                No current requests.
              </p>
            ) : (
              <div className="space-y-4">
                {current.map((req) => (
                  <div
                    key={req.id}
                    className="border border-[#E6E4DF] bg-white p-5 rounded-md"
                  >
                    <p className="text-sm text-gray-600">
                      {req.created_at
                        ? new Date(
                            req.created_at
                          ).toLocaleDateString()
                        : "Date not set"}
                    </p>
                    <h3 className="text-lg font-serif mt-1">
                      {req.topic || "Topic not set"}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">
                      Speaker:{" "}
                      {req.preferred_speaker ||
                        "Not specified"}
                    </p>
                    <p className="text-sm text-gray-700">
                      Date/Location:{" "}
                      {req.date_location ||
                        "Not specified"}
                    </p>
                    <p className="text-sm text-gray-700">
                      Status:{" "}
                      {req.status || "Pending"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-serif mb-4">
              Previous Requests
            </h2>
            {previous.length === 0 ? (
              <p className="text-gray-600">
                No previous requests.
              </p>
            ) : (
              <div className="space-y-4">
                {previous.map((req) => (
                  <div
                    key={req.id}
                    className="border border-[#E6E4DF] bg-white p-5 rounded-md"
                  >
                    <p className="text-sm text-gray-600">
                      {req.created_at
                        ? new Date(
                            req.created_at
                          ).toLocaleDateString()
                        : "Date not set"}
                    </p>
                    <h3 className="text-lg font-serif mt-1">
                      {req.topic || "Topic not set"}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">
                      Speaker:{" "}
                      {req.preferred_speaker ||
                        "Not specified"}
                    </p>
                    <p className="text-sm text-gray-700">
                      Date/Location:{" "}
                      {req.date_location ||
                        "Not specified"}
                    </p>
                    <p className="text-sm text-gray-700">
                      Status:{" "}
                      {req.status || "Closed"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
