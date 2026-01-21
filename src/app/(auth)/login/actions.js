"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = createClient();
  await supabase.auth.signInWithPassword({ email, password });

  redirect("/notes");
}
