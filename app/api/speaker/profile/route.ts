import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const ALLOWED_FIELDS = [
  "full_name",
  "photo_url",
  "gender",
  "date_of_birth",
  "email",
  "phone_whatsapp",
  "location",
  "preferred_time_zone",
  "current_designation",
  "affiliated_organizations",
  "years_of_experience",
  "languages_spoken",
  "training_lineage",
  "academic_qualifications",
  "core_knowledge_domains",
  "sub_domains",
  "key_publications",
  "delivery_modes",
  "experience_level",
  "preferred_audience",
  "preferred_event_formats",
  "languages_for_delivery",
  "presentation_style",
  "tech_proficiency",
  "availability_type",
  "availability_notes",
  "preferred_notice_period",
  "willing_to_travel",
  "travel_restrictions",
  "online_ready",
  "affiliations_declared",
  "public_alignment",
  "conflict_of_interest",
  "ethical_commitment",
  "short_bio",
  "detailed_bio",
  "talk_topics",
  "sample_talk_links",
  "media_mentions",
];

async function getUser(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.replace("Bearer ", "");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  if (user.user_metadata?.role !== "speaker") return null;
  return user;
}

export async function GET(req: Request) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("speakers")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function PATCH(req: Request) {
  const user = await getUser(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const update: Record<string, unknown> = {};
  for (const key of ALLOWED_FIELDS) {
    if (key in body) update[key] = body[key];
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ success: false, error: "No valid fields" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("speakers")
    .update(update)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
