"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addNote(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from("notes").insert({
    title,
    content,
    user_id: user.id,
  });

  revalidatePath("/notes");
}
