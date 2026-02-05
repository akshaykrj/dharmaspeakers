import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
      from: `"DSB Website" <${process.env.SMTP_USER}>`,
      to: "dsb@dharma360.com",
      subject: "New Speaker Request",
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
