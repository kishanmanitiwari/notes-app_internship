import { createClient } from "@/lib/supabase/server";
import { addNote } from "./actions";

export default async function NotesPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-10 space-y-4">
      <p>User: {user.email}</p>

      <form action={addNote} className="space-y-2">
        <input name="title" placeholder="title" />
        <textarea name="content" placeholder="note" />
        <button>Add</button>
      </form>

      {notes.map((n) => (
        <div key={n.id}>
          <b>{n.title}</b>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
}
