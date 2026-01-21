"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNote(formData) {
  const title = formData.get("title");
  const content = formData.get("content") || null;

  const supabase = await createClient();

  if (!supabase) {
    throw new Error("Database connection failed");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!title || title.trim() === "") {
    throw new Error("Note title is required");
  }

  const { error } = await supabase.from("notes").insert({
    title: title.trim(),
    content: content?.trim() || null,
    user_id: user.id,
  });

  if (error) {
    console.error("Error adding note:", error);
    throw new Error("Failed to add note");
  }

  revalidatePath("/notes");
}

export async function logout() {
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}
