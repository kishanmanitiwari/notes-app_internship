"use client";

// TODO: Uncomment these imports when you implement the backend
// import { createClient } from "@/lib/supabase/server";
// import { addNote, logout } from "./actions";
// import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const router = useRouter();
  
  // ============================================
  // 🔴 BACKEND AUTH INTEGRATION POINT #3
  // ============================================
  // TODO: Replace mock state with real auth check
  // 
  // When teaching, show students:
  // 1. How to check if user is authenticated
  // 2. How to redirect to login if not authenticated
  // 3. How to fetch user-specific data
  
  const [user, setUser] = useState(null); // MOCK: Replace with real user from auth
  const [notes, setNotes] = useState([]); // MOCK: Replace with real notes from database
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // MOCK: Simulating auth check
    console.log("⚠️ MOCK: Authentication check not implemented");
    console.log("⚠️ MOCK: Using fake user and notes data");
    
    // Fake data for demonstration
    setUser({ id: "user-123", email: "demo@example.com" });
    setNotes([
      { id: 1, title: "Sample Note 1", content: "This is a demo note", created_at: new Date().toISOString() },
      { id: 2, title: "Sample Note 2", content: null, created_at: new Date().toISOString() },
    ]);
    setIsLoading(false);
    
    // TODO: Replace with real implementation:
    // const supabase = await createClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) redirect("/login");
    // const { data: notes } = await supabase.from("notes").select().eq("user_id", user.id);
  }, []);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <button
          onClick={() => {
            // ============================================
            // 🔴 BACKEND AUTH INTEGRATION POINT #4
            // ============================================
            // TODO: Implement logout action
            console.log("⚠️ MOCK: Logout not implemented");
            router.push("/login");
            // TODO: Replace with: await logout();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          // ============================================
          // 🔴 BACKEND AUTH INTEGRATION POINT #5
          // ============================================
          // TODO: Implement addNote server action
          const formData = new FormData(e.target);
          const title = formData.get("title");
          
          console.log("📝 Note to add:", title);
          console.log("⚠️ MOCK: Add note backend not implemented");
          
          // MOCK: Add to local state
          const newNote = {
            id: Date.now(),
            title,
            content: null,
            created_at: new Date().toISOString()
          };
          setNotes([newNote, ...notes]);
          e.target.reset();
          
          // TODO: Replace with: await addNote(formData);
        }}
        className="space-y-2"
      >
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
