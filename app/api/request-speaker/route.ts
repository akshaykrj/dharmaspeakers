import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.institution_name || !data.email) {
      return NextResponse.json(
        { success: false, error: "Institution name and email are required." },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from("speaker_requests")
      .insert({
        institution_name: data.institution_name,
        contact_person: data.contact_person,
        email: data.email,
        engagement_type: data.engagement_type || null,
        audience: data.audience || null,
        date_location: data.date_location || null,
        preferred_speaker: data.preferred_speaker || null,
        topic: data.topic || null,
        budget: data.budget || null,
        additional_notes: data.additional_notes || null,
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("request-speaker error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
