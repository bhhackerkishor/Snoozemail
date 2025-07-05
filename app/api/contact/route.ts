// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Contact from "@/lib/model/Contact";
import connectToDB from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Connect to DB
    await connectToDB();

    // Parse and validate input
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    // Create new contact document
    const newContact = new Contact({
      name,
      email,
      subject: subject || "No subject",
      message,
    });

    // Save to database
    const savedContact = await newContact.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      //to: 'contact@snoozemail.in',
      to: "kishorzoro@gmail.com",
      subject: `New Contact: ${subject || "No subject"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "No subject"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Submission ID:</strong> ${savedContact._id}</p>
      `,
    });

    return NextResponse.json(
      { success: true, id: savedContact._id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
