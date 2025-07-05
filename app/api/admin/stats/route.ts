// app/api/admin/stats/route.ts
import connectToDB from "@/lib/db";
import User from "@/lib/model/User";
import Reminder from "@/lib/model/reminder";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      usedRemindersThisMonth: 3, // tweak threshold as you like
    });

    const emailsSent = await Reminder.countDocuments({ status: "sent" });
    const emailsSnoozed = await Reminder.countDocuments({ status: "snoozed" });

    // TODO: calculate real openRate / clickRate from tracking data
    const openRate = 68.5;
    const clickRate = 12.3;

    return NextResponse.json({
      totalUsers,
      activeUsers,
      emailsSent,
      emailsSnoozed,
      openRate,
      clickRate,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return new NextResponse("Failed to load stats", { status: 500 });
  }
}
