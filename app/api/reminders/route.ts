import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reminder from "@/lib/model/reminder";
import User from "@/lib/model/User";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clerkId, to, subject, html, remindAt } = body;

    if (!clerkId || !to || !subject || !remindAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await connectDB();

    // Create the reminder
    const reminder = await Reminder.create({
      clerkId,
      to,
      subject,
      remindAt,
      body: html,
      sent: false,
    });

    // Find the user and increment usedRemindersThisMonth
    const user = await User.findOne({ clerkId });
    if (user) {
      user.usedRemindersThisMonth = (user.usedRemindersThisMonth || 0) + 1;
      await user.save();
    }

    return NextResponse.json({ success: true, reminder }, { status: 201 });
  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const reminders = await Reminder.find({ clerkId: userId });
    return NextResponse.json(reminders);
  } catch (error) {
    console.error("API error fetching reminders:", error);
    return new NextResponse("Error fetching reminders", { status: 500 });
  }
}
