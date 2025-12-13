import { createClient } from "@/utils/supabase/server";
import { ClassesPageContent } from "@/components/classes/classes-page-content";

export const dynamic = "force-dynamic";

export default async function ClassesPage() {
  const supabase = await createClient();

  const { data: classesData, error } = await supabase
    .from("classes")
    .select(
      `
      *,
      enrollments: enrollments(count)
    `
    )
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching classes:", error);

  const formattedClasses =
    classesData?.map((cls: any) => ({
      ...cls,
      student_count: cls.enrollments?.[0]?.count || 0,
    })) || [];

  const { data: allStudents } = await supabase
    .from("students")
    .select("id, full_name, email")
    .order("full_name");

  return (
    <ClassesPageContent
      classes={formattedClasses}
      allStudents={allStudents || []}
    />
  );
}
