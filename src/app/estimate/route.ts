import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatProjectDescription(value: unknown) {
  const lines = String(value ?? "")
    .split(/\r?\n/)
    .map((line) => escapeHtml(line.trim()))
    .filter(Boolean);

  if (lines.length === 0) {
    return "<p>No description provided.</p>";
  }

  return lines
    .map((line) => `<p style="margin: 0 0 8px;"><span>${line}</span></p>`)
    .join("");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = escapeHtml(body.fullName);
    const phone = escapeHtml(body.phone);
    const email = escapeHtml(body.email);
    const city = escapeHtml(body.city);
    const serviceNeeded = escapeHtml(body.serviceNeeded);
    const workNeeded = escapeHtml(body.workNeeded);
    const propertyType = escapeHtml(body.propertyType);
    const projectDescription = formatProjectDescription(body.projectDescription);

    if (!fullName || !phone || !serviceNeeded) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "ProView Landscaping <noreply@proviewlandscape.com>",
      to: [
        process.env.CLIENT_EMAIL as string,
        process.env.YOUR_EMAIL as string,
      ],
      subject: `New Estimate Request from ${fullName}`,
      html: `
        <h2>New Estimate Request</h2>

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>City / Work Area:</strong> ${city || "Not provided"}</p>

        <hr />

        <p><strong>Service Needed:</strong> ${serviceNeeded}</p>
        <p><strong>Work Needed:</strong> ${workNeeded || "Not provided"}</p>
        <p><strong>Property Type:</strong> ${propertyType || "Not provided"}</p>

        <hr />

        <p><strong>Project Description:</strong></p>
        <div>${projectDescription}</div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Estimate form error:", error);

    return Response.json(
      { error: "Something went wrong sending the estimate request." },
      { status: 500 }
    );
  }
}
