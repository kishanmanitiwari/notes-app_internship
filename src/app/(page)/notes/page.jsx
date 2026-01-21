import { createClient } from "@/lib/supabase/server";
import { addNote, logout } from "./actions";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  const supabase = await createClient();

  if (!supabase) {
    return <div className="p-6">Error: Unable to connect to database</div>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: notes } = await supabase
    .from("notes")
    .select()
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <form action={logout}>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>

      <form action={addNote} className="space-y-2">
        <input
          name="title"
          placeholder="New note title..."
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Note
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="border p-4 rounded bg-white shadow-sm"
            >
              <h2 className="font-semibold text-lg">{note.title}</h2>
              {note.content && <p className="text-gray-600 mt-1">{note.content}</p>}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notes yet. Create your first note above!</p>
        )}
      </div>
    </div>
  );
}
