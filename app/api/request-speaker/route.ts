import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    if (
      (emailUser && /^["'].*["']$/.test(emailUser)) ||
      (emailPass && /^["'].*["']$/.test(emailPass))
    ) {
      console.warn(
        "request-speaker warning: EMAIL_USER or EMAIL_PASS appears to be wrapped in quotes. Remove the quotes from the env value."
      );
    }

    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const message = `
New Speaker Request

Institution: ${data.institution_name}
Contact Person: ${data.contact_person}
Email: ${data.email}

Type of Engagement: ${data.engagement_type}
Audience: ${data.audience}
Date & Location: ${data.date_location}

Preferred Speaker / Domain: ${data.preferred_speaker}
Topic: ${data.topic}
Budget: ${data.budget}

Additional Notes:
${data.additional_notes}
`;

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
      throw insertError;
    }

    await transporter.sendMail({
      from: `"DSB Website" <${process.env.EMAIL_USER}>`,
      to: "jha.akshay.kr@gmail.com",
      subject: "New Speaker Request",
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("request-speaker error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
