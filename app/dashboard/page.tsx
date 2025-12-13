import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-roboto">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#00954f]/10 p-2 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-[#00954f]" />
          </div>
          <h1 className="text-xl font-bold text-[#146939] font-trajan">
            SNS{" "}
            <span className="text-gray-400 font-normal font-sans text-sm ml-2">
              | Dashboard
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">
            Logged in as:{" "}
            <span className="font-semibold text-[#17321A]">{user.email}</span>
          </span>
          <form action={signOut}>
            <Button
              variant="outline"
              size="sm"
              className="border-[#146939] text-[#146939] hover:bg-[#146939] hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-semibold text-[#17321A] font-montserrat">
            Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Welcome back to the notification system.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-montserrat font-semibold text-[#146939]">
              Latest Notifications
            </h3>
            <p className="text-3xl font-bold text-[#17321A] mt-2">12</p>
            <p className="text-sm text-gray-500 mt-1">Unread alerts</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-montserrat font-semibold text-[#146939]">
              Exam Results
            </h3>
            <p className="text-3xl font-bold text-[#17321A] mt-2">Pending</p>
            <p className="text-sm text-gray-500 mt-1">Next release: Dec 15</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-montserrat font-semibold text-[#146939]">
              System Status
            </h3>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-3 h-3 rounded-full bg-[#00954f]"></span>
              <p className="text-[#17321A] font-medium">Operational</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
