"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  
  if (!supabase) {
    console.error("Failed to create Supabase client");
    throw new Error("Authentication service unavailable");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  redirect("/notes");
}
