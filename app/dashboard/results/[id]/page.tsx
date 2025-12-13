import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { InputScoresContent } from "@/components/results/input-scores-content";

export const dynamic = "force-dynamic";

export default async function InputScoresPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: exam } = await supabase
    .from("exams")
    .select("*")
    .eq("id", id)
    .single();
  if (!exam) return notFound();

  const { data: classData } = await supabase
    .from("classes")
    .select("id")
    .eq("code", exam.class_code)
    .single();
  if (!classData) return notFound();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`student:students(id, full_name, student_id, email)`)
    .eq("class_id", classData.id)
    .order("student(full_name)");

  const { data: existingResults } = await supabase
    .from("results")
    .select("student_id, score")
    .eq("exam_id", id);

  const { data: allStudents } = await supabase
    .from("students")
    .select("id, full_name, email")
    .order("full_name");

  const studentsWithScores =
    enrollments?.map((e: any) => {
      const scoreRecord = existingResults?.find(
        (r) => r.student_id === e.student.id
      );
      return {
        ...e.student,
        score: scoreRecord ? scoreRecord.score : "",
      };
    }) || [];

  return (
    <InputScoresContent
      exam={exam}
      students={studentsWithScores}
      allStudents={allStudents || []}
      classId={classData.id}
    />
  );
}
