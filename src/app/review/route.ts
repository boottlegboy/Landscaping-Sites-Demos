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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = escapeHtml(body.fullName);
    const rating = escapeHtml(body.rating);
    const serviceUsed = escapeHtml(body.serviceUsed);
    const city = escapeHtml(body.city);
    const reviewMessage = escapeHtml(body.reviewMessage);

    if (!fullName || !rating || !reviewMessage) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Review Submission <onboarding@resend.dev>",
      to: [
        process.env.CLIENT_EMAIL as string,
        process.env.YOUR_EMAIL as string,
      ],
      subject: `New ${rating}/5 Review from ${fullName}`,
      html: `
        <h2>New Review Submission</h2>

        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Service Used:</strong> ${serviceUsed || "Not provided"}</p>
        <p><strong>City:</strong> ${city || "Not provided"}</p>

        <hr />

        <p><strong>Review:</strong></p>
        <p>${reviewMessage}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Review form error:", error);

    return Response.json(
      { error: "Something went wrong sending the review." },
      { status: 500 }
    );
  }
}