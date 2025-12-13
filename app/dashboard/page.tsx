"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  FileWarning,
  ArrowRight,
  PlusCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

function TimeWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end text-right">
      <div className="text-3xl font-bold text-[#17321A] font-montserrat tabular-nums tracking-tight">
        {time.toLocaleTimeString("en-US", { hour12: false })}
      </div>
      <div className="text-sm font-medium text-[#00954f] font-roboto uppercase tracking-wider">
        {time.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}

const stats = [
  {
    title: "Total Students",
    value: "142",
    description: "Across 4 active classes",
    icon: Users,
    color: "text-[#146939]",
    bg: "bg-[#e6f4ea]",
  },
  {
    title: "Pending Results",
    value: "28",
    description: "From yesterday's Biology quiz",
    icon: FileWarning,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Exams Managed",
    value: "12",
    description: "3 exams scheduled this week",
    icon: GraduationCap,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const recentExams = [
  {
    name: "Chemistry Midterm",
    class: "CHEM-101",
    date: "Oct 24, 2024",
    status: "Published",
  },
  {
    name: "Biology Pop Quiz",
    class: "BIO-202",
    date: "Oct 26, 2024",
    status: "Draft",
  },
  {
    name: "Physics Final",
    class: "PHY-303",
    date: "Nov 02, 2024",
    status: "Scheduled",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#17321A] font-montserrat">
            Dashboard
          </h1>
          <p className="text-gray-500 font-roboto mt-2 text-sm sm:text-base max-w-md">
            Welcome back, Professor Smith. Here is your daily overview.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 min-w-[200px] justify-between">
          <div className="p-3 bg-[#e6f4ea] rounded-full text-[#146939]">
            <Clock className="h-5 w-5" />
          </div>
          <TimeWidget />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 bg-white group overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#146939] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold font-montserrat text-gray-600 uppercase tracking-wide">
                {stat.title}
              </CardTitle>
              <div
                className={`p-2 rounded-full ${stat.bg} transition-colors group-hover:bg-[#17321A] group-hover:text-white`}
              >
                <stat.icon
                  className={`h-4 w-4 ${stat.color} group-hover:text-white`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-montserrat text-[#17321A]">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1 font-roboto font-medium">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 lg:col-span-5 border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-50 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-[#17321A] font-montserrat">
                  Recent Exams
                </CardTitle>
                <CardDescription className="font-roboto text-gray-500 mt-1">
                  Latest exam papers created or modified.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                className="text-[#00954f] hover:text-[#17321A] hover:bg-[#e6f4ea] font-montserrat text-xs font-semibold"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentExams.map((exam, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-[#00954f]/30 hover:bg-white hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#17321A] font-bold font-montserrat shadow-sm group-hover:border-[#00954f] group-hover:text-[#00954f] transition-colors">
                      {exam.class.substring(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#17321A] font-montserrat group-hover:text-[#00954f] transition-colors">
                        {exam.name}
                      </p>
                      <p className="text-xs text-gray-500 font-roboto mt-0.5">
                        {exam.class} •{" "}
                        <span className="font-medium">{exam.date}</span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-xs px-3 py-1 rounded-full font-semibold font-roboto ${
                      exam.status === "Published"
                        ? "bg-[#e6f4ea] text-[#146939]"
                        : exam.status === "Draft"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {exam.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 lg:col-span-2 bg-[#17321A] text-white border-none shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-[#00954f] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-[#146939] rounded-full opacity-30 blur-2xl"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="font-montserrat text-xl font-bold tracking-wide">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-gray-300 font-roboto text-xs border-l-2 border-[#00954f] pl-2 mt-1">
              Manage your workflow efficiently.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 relative z-10">
            <Link href="/dashboard/exams/new" className="w-full">
              <Button className="w-full justify-between bg-white hover:bg-gray-50 text-[#17321A] font-bold font-montserrat h-12 shadow-sm group">
                Create New Exam
                <PlusCircle className="h-5 w-5 text-[#00954f] group-hover:scale-110 transition-transform" />
              </Button>
            </Link>

            <Link href="/dashboard/results" className="w-full">
              <Button
                variant="outline"
                className="w-full justify-between bg-transparent border-gray-600 text-white hover:bg-[#146939] hover:text-white hover:border-[#146939] font-montserrat h-12"
              >
                Send Scores
                <CheckCircle className="h-5 w-5 opacity-70" />
              </Button>
            </Link>

            <Link href="/dashboard/reports" className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start px-0 text-gray-300 hover:text-white hover:bg-transparent font-roboto text-xs uppercase tracking-wider"
              >
                View Reports <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </Link>
          </CardContent>

          <div className="relative z-10 p-6 pt-0">
            <div className="p-3 rounded-lg bg-[#146939]/50 backdrop-blur-sm border border-[#146939]">
              <h4 className="font-bold text-xs mb-1 font-montserrat text-[#00954f] flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00954f] mr-2"></span>
                Tip of the day
              </h4>
              <p className="text-[10px] text-gray-200 font-roboto leading-relaxed opacity-90">
                Bulk-import student scores using CSV format in the Students tab
                to save time.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
