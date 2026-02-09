import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
