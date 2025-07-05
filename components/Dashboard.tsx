"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, BellRing, Mail, Plus, Rocket, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  AreaChart as RechartsAreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { AreaChart as AreaChartIcon } from "lucide-react";
import Link from "next/link";

interface Reminder {
  _id: string;
  subject: string;
  to: string;
  remindAt: string;
  sent: string;
  clerkId: string;
  body?: string;
}

interface User {
  name: string;
  usedRemindersThisMonth: number;
  plan: string;
  email?: string;
}

export default function Dashboard({
  user,
  initialReminders,
}: {
  user: User;
  initialReminders: Reminder[];
}) {
  const { name, usedRemindersThisMonth, plan, email } = user;
  const reminderLimit = plan === "free" ? 10 : plan === "pro" ? 100 : Infinity;
  const [reminders] = useState<Reminder[]>(initialReminders);

  const progress =
    reminderLimit === Infinity
      ? 100
      : Math.min((usedRemindersThisMonth / reminderLimit) * 100, 100);

  const now = new Date();
  const dueReminders = reminders.filter(
    (reminder) => new Date(reminder.remindAt) <= now,
  );
  const dueCount = dueReminders.length;
  const snoozedCount = usedRemindersThisMonth - dueCount;

  const planDetails: Record<string, { name: string; color: string }> = {
    free: {
      name: "Free",
      color: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    },
    pro: {
      name: "Pro",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    team: {
      name: "Team",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
  };

  // % used
  const increase = reminderLimit - usedRemindersThisMonth / reminderLimit; // % increase from last month
  const usedReminders = usedRemindersThisMonth;
  const totalReminders = reminderLimit;
  const radius = 50;
  const circumference = Math.PI * radius; // Half circle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const hourlyChartData: Record<string, number> = {};

  reminders.forEach((reminder) => {
    const date = new Date(reminder.remindAt);
    const hour = date.getHours(); // 0–23
    const label = `${hour}:00`;

    if (!hourlyChartData[label]) hourlyChartData[label] = 0;
    hourlyChartData[label]++;
  });

  const chartData = Object.entries(hourlyChartData).map(([hour, count]) => ({
    name: hour,
    time: count,
  }));
  const remindersPerDayMap: Record<string, number> = {};

  reminders.forEach((reminder) => {
    const date = new Date(reminder.remindAt);
    const dayLabel = date.toISOString().split("T")[0]; // Format: "2025-06-24"

    if (!remindersPerDayMap[dayLabel]) remindersPerDayMap[dayLabel] = 0;
    remindersPerDayMap[dayLabel]++;
  });

  const sentCount = reminders.filter((rem) => rem.sent).length;
  const unsentCount = reminders.length - sentCount;

  const statusData = [
    { name: "Sent", value: sentCount },
    { name: "Unsent", value: unsentCount },
  ];

  console.log(chartData);
  const triggerError = () => {
    throw new Error("Test error from component!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={triggerError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Trigger Component Error
        </button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-sky-700 dark:text-sky-300">
              <Home className="w-6 h-6" /> Dashboard
            </h1>
            <p className="text-gray-700 dark:text-gray-200 mt-2">
              Welcome back,{" "}
              <span className="font-semibold text-sky-700 dark:text-sky-300">
                {name}
              </span>{" "}
              👋
            </p>
          </div>
          <Badge
            className={`${planDetails[plan].color} px-3 py-1 text-sm font-medium`}
          >
            {planDetails[plan].name} Plan
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bell className="w-4 h-4" /> Total Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{usedRemindersThisMonth}</p>
              <p className="text-xs mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BellRing className="w-4 h-4" /> Active Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dueCount}</p>
              <p className="text-xs mt-1">Ready to be sent</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Snoozed Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{snoozedCount}</p>
              <p className="text-xs mt-1">Already sented mails</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Account Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium truncate">
                {email || "Not provided"}
              </p>
              <p className="text-xs mt-1">For notifications</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Usage Progress */}
          <div className="lg:col-span-1">
            <Card className="h-full border-sky-200 dark:border-sky-800">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Plan Usage</span>
                  <span className="text-sm font-normal">
                    {usedRemindersThisMonth} of{" "}
                    {reminderLimit === Infinity ? "∞" : reminderLimit} used
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between mt-2 text-sm">
                  <span>{planDetails[plan].name} Plan</span>
                  <span>{Math.round(progress)}% used</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Card className="h-full border-sky-200 dark:border-sky-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AreaChartIcon className="w-4 h-4" /> Reminder Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="areaColor"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#38bdf8"
                            stopOpacity={0.6}
                          />
                          <stop
                            offset="95%"
                            stopColor="#38bdf8"
                            stopOpacity={0.05}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis hide />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="time"
                        stroke="#38bdf8"
                        fill="url(#areaColor)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Half Circle Progress */}
          <Card className="border-sky-200 dark:border-sky-800">
            <CardHeader>
              <CardTitle>Monthly Reminder Usage</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You&apos;ve used {usedReminders} of {totalReminders} reminders
                this month.
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative h-40 flex items-end justify-center mb-6">
                <svg className="w-full h-full" viewBox="0 0 120 60">
                  <path
                    d="M 10,60 A 50,50 0 0 1 110,60"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <path
                    d="M 10,60 A 50,50 0 0 1 110,60"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="progressGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">
                    {progress.toFixed(1)}%
                  </span>
                  <span className="block text-green-500 text-sm mt-1">
                    ↑ {increase}%
                  </span>
                </div>
              </div>
              <div className="bg-sky-50 dark:bg-sky-900/40 p-4 rounded-md">
                <p className="text-sky-800 dark:text-sky-200 text-sm">
                  Great job! You&apos;ve increased your usage this month. Keep
                  staying organized!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="border-sky-200 dark:border-sky-800">
            <CardHeader>
              <CardTitle>Reminder Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                      dataKey="value"
                    >
                      <Cell fill="#60a5fa" />
                      <Cell fill="#f87171" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/remainders" className="flex items-center gap-2">
            <Button className="flex-1 sm:flex-none gap-2 bg-sky-600 hover:bg-sky-700 text-white">
              <Plus className="w-4 h-4" /> Create Reminder
            </Button>
          </Link>
          <Link href="/subscription" className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none gap-2 border-sky-600 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-800"
            >
              <Rocket className="w-4 h-4" /> Upgrade Plan
            </Button>
          </Link>
        </div>

        {/* Reminder List */}
        <Card className="border-sky-200 dark:border-sky-800">
          <CardHeader>
            <CardTitle>Recent Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            {reminders.length > 0 ? (
              <div className="space-y-4">
                {reminders.slice(0, 5).map((reminder) => (
                  <div
                    key={reminder._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:bg-sky-100 dark:hover:bg-sky-800"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium">{reminder.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        To: {reminder.to}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(reminder.remindAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No reminders created yet</p>
                <Link href="/remainders" className="flex items-center gap-2">
                  <Button variant="link" className="mt-2 text-sky-600">
                    Create your first reminder
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
