import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 503 },
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "RY/OS Portfolio <onboarding@resend.dev>",
      to: "yadavrohit0660@gmail.com",
      replyTo: email,
      subject: `[RY/OS] ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0B1017; color: #F5F7FA;">
          <div style="border-bottom: 1px solid rgba(56, 189, 248, 0.2); padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 14px; color: #38BDF8; letter-spacing: 0.1em; margin: 0;">RY/OS INCOMING TRANSMISSION</h1>
          </div>
          <p style="color: #8B95A5; font-size: 12px; letter-spacing: 0.1em; margin-bottom: 4px;">FROM</p>
          <p style="margin: 0 0 16px; font-size: 16px;">${name} &lt;${email}&gt;</p>
          <p style="color: #8B95A5; font-size: 12px; letter-spacing: 0.1em; margin-bottom: 4px;">SUBJECT</p>
          <p style="margin: 0 0 16px; font-size: 16px;">${subject}</p>
          <p style="color: #8B95A5; font-size: 12px; letter-spacing: 0.1em; margin-bottom: 4px;">MESSAGE</p>
          <div style="padding: 16px; background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.1); border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(56, 189, 248, 0.1); text-align: center;">
            <p style="color: #8B95A5; font-size: 10px; letter-spacing: 0.15em; margin: 0;">SENT VIA RY/OS PORTFOLIO</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: "Failed to send message" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message delivered successfully",
    });
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
