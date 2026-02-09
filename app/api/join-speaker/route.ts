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
        "join-speaker warning: EMAIL_USER or EMAIL_PASS appears to be wrapped in quotes. Remove the quotes from the env value."
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
New Speaker Application


Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}

Professional Details:
${data.professional_details}

Academic Background:
${data.academic_background}

Domains:
${data.domains}

Speaking Details:
${data.speaking_details}

Engagement Preferences:
${data.engagement_preferences}

Affiliations & Ethics:
${data.affiliations_ethics}

Statement of Interest:
${data.statement}
`;

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
        engagement_preferences:
          data.engagement_preferences || null,
        affiliations_ethics: data.affiliations_ethics || null,
        statement: data.statement,
      });

    if (insertError) {
      throw insertError;
    }

    await transporter.sendMail({
      from: `"DSB Website" <${process.env.EMAIL_USER}>`,
      to: "jha.akshay.kr@gmail.com",
      subject: "New Speaker Application – DSB",
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("join-speaker error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
