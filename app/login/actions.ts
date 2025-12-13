"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function verifyEmail(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid academic email address." };
  }

  const localPart = email.split("@")[0];
  const rawName = localPart.split(".")[0];

  const firstName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  return { success: true, name: firstName };
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: "Invalid credentials. Please try again." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const mustChangePassword = user.user_metadata?.must_change_password;

    if (mustChangePassword === undefined) {
      await supabase.auth.updateUser({
        data: { must_change_password: true },
      });
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
