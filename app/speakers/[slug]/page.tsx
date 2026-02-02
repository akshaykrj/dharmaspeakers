export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function SpeakerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: speaker } = await supabase
    .from("speakers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!speaker) {
    return (
      <div style={{ padding: "4rem" }}>
        Speaker not found
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf9f6",
        padding: "6rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "3rem",
        }}
      >
        {/* PHOTO */}
        <div>
          <img
            src={speaker.photo_url}
            alt={speaker.name}
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              borderRadius: "14px",
              display: "block",
            }}
          />
        </div>

        {/* TEXT CARD */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            padding: "3rem",
            color: "#111111",
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          <h1
            style={{
              fontSize: "2.4rem",
              marginBottom: "0.75rem",
              lineHeight: "1.2",
            }}
          >
            {speaker.name}
          </h1>

          {speaker.current_role && (
            <div
              style={{
                fontSize: "1.1rem",
                color: "#444444",
                marginBottom: "1.5rem",
              }}
            >
              {speaker.current_role}
            </div>
          )}

          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#999999",
              marginBottom: "2rem",
            }}
          />

          {speaker.bio && (
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.75",
                color: "#222222",
                maxWidth: "680px",
              }}
            >
              {speaker.bio}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
