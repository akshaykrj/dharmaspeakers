import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { error: insertError } = await supabase
      .from("speaker_applications")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        professional_details: data.professional_details,
        academic_background: data.academic_background || null,
        domains: data.domains || null,
        speaking_details: data.speaking_details || null,
        engagement_preferences: data.engagement_preferences || null,
        affiliations_ethics: data.affiliations_ethics || null,
        statement: data.statement,
      });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("join-speaker error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
