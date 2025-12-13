import { createClient } from "@/utils/supabase/server";
import { StudentsTable } from "@/components/students/students-table";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const supabase = await createClient();

  const { data: students, error } = await supabase
    .from("students")
    .select(
      `
      *,
      enrollments (
        class: classes (
          code
        )
      )
    `
    )
    .order("full_name", { ascending: true });

  if (error) {
    console.error("Error fetching students:", error);
  }

  const { data: classes } = await supabase
    .from("classes")
    .select("id, name, code")
    .eq("status", "active")
    .order("name");

  const formattedStudents =
    students?.map((student: any) => ({
      ...student,

      enrolled_classes: student.enrollments
        .map((e: any) => e.class?.code)
        .filter(Boolean),
    })) || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#17321A] font-montserrat tracking-tight">
            Students
          </h1>
          <p className="text-gray-500 font-roboto mt-3 text-lg">
            Manage student directory and enrollments.
          </p>
        </div>
      </div>

      <StudentsTable
        students={formattedStudents}
        availableClasses={classes || []}
      />
    </div>
  );
}
