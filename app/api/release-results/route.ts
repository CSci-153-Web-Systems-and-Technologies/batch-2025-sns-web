import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import ResultEmail from "@/components/emails/result-email";

export async function POST(request: Request) {
  try {
    const { examId } = await request.json();
    const supabase = await createClient();

    const { data: exam } = await supabase
      .from("exams")
      .select("*, class:classes(name, code)")
      .eq("id", examId)
      .single();

    const { data: results } = await supabase
      .from("results")
      .select("*, student:students(full_name, email)")
      .eq("exam_id", examId)
      .not("score", "is", null);

    if (!results || results.length === 0)
      return NextResponse.json({ message: "No scores" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    let successCount = 0;
    let failureCount = 0;

    const emailPromises = results.map(async (result) => {
      if (!result.student?.email) return null;

      const emailHtml = await render(
        ResultEmail({
          studentName: result.student.full_name,
          examName: exam.name,
          className: `${exam.class.name} (${exam.class.code})`,
          score: result.score,
          totalScore: exam.total_score || 100,
        })
      );

      try {
        const info = await transporter.sendMail({
          from: `"SNS Portal" <${process.env.GMAIL_USER}>`,
          to: result.student.email,
          subject: `Exam Results: ${exam.name}`,
          html: emailHtml,
        });
        console.log(`[Email Sent] Message ID: ${info.messageId}`);
        successCount++;
        return true;
      } catch (err) {
        console.error(`[Email Failed] To: ${result.student.email}`, err);
        failureCount++;
        return null;
      }
    });

    await Promise.all(emailPromises);

    if (successCount > 0) {
      await supabase
        .from("exams")
        .update({ release_status: "released", auto_release: false })
        .eq("id", examId);

      return NextResponse.json({
        success: true,
        sent: successCount,
        failed: failureCount,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to send any emails. Check server logs." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
