import nodemailer from "nodemailer";

export async function POST(req: Request) {
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

  await transporter.sendMail({
    from: `"DSB Website" <${process.env.EMAIL_USER}>`,
    to: "dsb@dharma360.com",
    subject: "New Speaker Application – DSB",
    text: message,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
