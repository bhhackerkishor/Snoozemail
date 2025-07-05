"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Bell,
  Users,
  Settings,
  Plus,
  Rocket,
  AreaChart as AreaChartIcon,
  PieChart,
  BarChart as BarChartIcon,
  Clock,
  Inbox,
  Send,
  ChevronDown,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  PieChart as RechartsPieChart,
  Area,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Activity = {
  id: string;
  user: string;
  action: string;
  time: string;
};

// activityLog: Activity[]

const AdminDashboard = () => {
  // Dummy data
  const [timeRange, setTimeRange] = useState("week");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    emailsSent: 0,
    emailsSnoozed: 0,
    openRate: 0,
    clickRate: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  // const stats = {
  // totalUsers: 1243,
  //  activeUsers: 892,
  //   emailsSent: 5682,
  //   emailsSnoozed: 2341,
  //openRate: 68.5,
  //   clickRate: 12.3,
  // }

  const userGrowthData = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 600 },
    { name: "Mar", users: 800 },
    { name: "Apr", users: 1000 },
    { name: "May", users: 1200 },
    { name: "Jun", users: 1400 },
    { name: "Jul", users: 1600 },
  ];

  const emailActivityData = [
    { name: "Mon", sent: 400, snoozed: 240 },
    { name: "Tue", sent: 300, snoozed: 139 },
    { name: "Wed", sent: 600, snoozed: 400 },
    { name: "Thu", sent: 800, snoozed: 500 },
    { name: "Fri", sent: 500, snoozed: 300 },
    { name: "Sat", sent: 200, snoozed: 100 },
    { name: "Sun", sent: 100, snoozed: 50 },
  ];

  const planDistributionData = [
    { name: "Free", value: 55 },
    { name: "Pro", value: 30 },
    { name: "Premium", value: 15 },
  ];

  console.log(recentActivity);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/admin/activity");
        const data = await res.json();
        setRecentActivity(data);
      } catch (err) {
        console.error("Failed to fetch recent activity:", err);
      }
    };

    fetchActivity();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              SnoozeMail Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Overview of your application&apos;s performance and metrics
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {timeRange === "day"
                    ? "Today"
                    : timeRange === "week"
                      ? "This Week"
                      : timeRange === "month"
                        ? "This Month"
                        : "This Year"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTimeRange("day")}>
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("week")}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("month")}>
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("year")}>
                  This Year
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  +12.5% from last {timeRange}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Bell className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeUsers}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  +8.2% from last {timeRange}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Emails Sent
                </CardTitle>
                <Send className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.emailsSent}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  +24.7% from last {timeRange}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Emails Snoozed
                </CardTitle>
                <Clock className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.emailsSnoozed}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  +15.3% from last {timeRange}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AreaChartIcon className="h-4 w-4" />
                  User Growth
                </CardTitle>
                <CardDescription>New users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userGrowthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUsers"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3b82f6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="h-4 w-4" />
                  Email Activity
                </CardTitle>
                <CardDescription>Sent vs snoozed emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emailActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sent" fill="#4ade80" />
                      <Bar dataKey="snoozed" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Plan Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={planDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent ?? 0 * 100).toFixed(0)}%`
                        }
                      >
                        {planDistributionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="h-4 w-4" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest user actions in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">
                          {activity.user}
                        </TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell className="text-right">
                          {activity.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="ghost" className="text-blue-600">
                  View all activity
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-4 w-4" />
                Email Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Open Rate</h3>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ArrowUp className="h-3 w-3 text-green-500" />
                      {(((stats.openRate - 65) / 65) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={stats.openRate} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>0%</span>
                    <span>{stats.openRate}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Click Rate</h3>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ArrowDown className="h-3 w-3 text-red-500" />
                      {(((stats.clickRate - 15) / 15) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={stats.clickRate} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>0%</span>
                    <span>{stats.clickRate}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          variants={itemVariants}
        >
          <Button className="flex-1 gap-2">
            <Plus className="w-4 h-4" />
            Add New User
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Settings className="w-4 h-4" />
            System Settings
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Rocket className="w-4 h-4" />
            Send Announcement
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
