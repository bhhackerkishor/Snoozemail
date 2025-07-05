// app/api/admin/activity/route.ts
import connectToDB from "@/lib/db";
import Reminder from "@/lib/model/reminder";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const recentReminders = await Reminder.find({})
      .sort({ updatedAt: -1 }) // latest first
      .limit(5);

    const activity = recentReminders.map((r) => ({
      id: r._id,
      user: r.to,
      action: r.status === "sent" ? "Sent Reminder" : "Created Reminder",
      time: r.updatedAt,
    }));
    console.log(recentReminders);
    return NextResponse.json(activity);
  } catch (error) {
    console.error("Activity API error:", error);
    return new NextResponse("Failed to load recent activity", { status: 500 });
  }
}
