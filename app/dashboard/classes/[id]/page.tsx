import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ClassDetailsContent } from "@/components/classes/class-details-content";

export const dynamic = "force-dynamic";

export default async function ClassDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: classData, error: classError } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();

  if (classError || !classData) {
    notFound();
  }

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("student:students(id, full_name, email)")
    .eq("class_id", id)
    .order("enrolled_at", { ascending: false });

  const enrolledStudents = enrollments?.map((e: any) => e.student) || [];

  const { data: allStudents } = await supabase
    .from("students")
    .select("id, full_name, email")
    .order("full_name");

  return (
    <ClassDetailsContent
      classData={classData}
      students={enrolledStudents}
      allStudents={allStudents || []}
    />
  );
}
