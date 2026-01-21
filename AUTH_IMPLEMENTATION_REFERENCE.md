# 🔐 Authentication Implementation Reference

Quick reference for implementing authentication. **Don't peek until you've tried!**

## 1. Login Action

**File:** `src/app/(auth)/login/actions.js`

```javascript
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  
  if (!supabase) {
    throw new Error("Database connection failed");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/notes");
}
```

## 2. Signup Action

**File:** `src/app/(auth)/signup/actions.js`

```javascript
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  
  if (!supabase) {
    throw new Error("Database connection failed");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/notes");
}
```

## 3. Login Page (Update to use real action)

**File:** `src/app/(auth)/login/page.jsx`

Replace the mock in `useActionState`:

```javascript
const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
  try {
    await login(formData);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}, { error: null });
```

**Don't forget to uncomment the import:**
```javascript
import { login } from "./actions";
```

## 4. Signup Page (Update to use real action)

**File:** `src/app/(auth)/signup/page.jsx`

Replace the mock in `useActionState`:

```javascript
const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
  try {
    await signup(formData);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}, { error: null });
```

**Don't forget to uncomment the import:**
```javascript
import { signup } from "./actions";
```

## 5. Notes Page (Convert to Server Component)

**File:** `src/app/(page)/notes/page.jsx`

Replace the entire component:

```javascript
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
```

**Remove:** `"use client"`, `useState`, `useEffect`, `useRouter`

## 6. Add Note Action

**File:** `src/app/(page)/notes/actions.js`

```javascript
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
```

## 7. Logout Action

**File:** `src/app/(page)/notes/actions.js`

Add this function to the same file:

```javascript
export async function logout() {
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}
```

## 🔑 Key Points to Remember

1. **Server Actions** must have `"use server"` at the top
2. **Always check authentication** before protected operations
3. **Always associate data with user_id** for security
4. **Error handling** is crucial - show errors to users
5. **Redirect** after successful login/signup/logout
6. **revalidatePath()** refreshes server component data

## 🚨 Common Errors

### "Cannot find module '@/lib/supabase/server'"
- Make sure you've set up Supabase client in that file
- Check your environment variables

### "User is not authenticated"
- Make sure you're calling `getUser()` correctly
- Check that login actually succeeded

### "Notes showing from all users"
- Make sure you're filtering: `.eq("user_id", user.id)`
- Check your database RLS policies

### "Redirect not working"
- Make sure you're importing from `"next/navigation"`
- Server actions handle redirects automatically

---

**Good luck! 🚀**
