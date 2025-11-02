import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();

  const message = formData.get("message")?.toString();
  const lang = formData.get("lang")?.toString() || "he"; // ברירת מחדל עברית

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }
await Promise.allSettled([

  // ✉️ שליחת מייל
   fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: "naama.hargil@gmail.com",
      subject: `New contact form message from ${name}`,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
             <p><b>Message:</b> ${message}</p>`,
    }),
  }),

  // 📊 שמירה ב־Google Sheets
   fetch(          import.meta.env.APPSSCRIPT_KEY, {
    method: "POST",
    body: JSON.stringify({ name, email, phone, message }),
    headers: { "Content-Type": "application/json" },
  })
]);



  // 👉 רידיירקט לעמוד תודה (לפי שפה)
  const url = new URL(request.url);
  url.pathname = `/${lang}/thank-you`;


  return Response.redirect(url.toString(), 303);};

