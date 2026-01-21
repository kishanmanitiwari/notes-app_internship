# 🔐 Authentication Teaching Guide

## Overview
This is a **frontend-only** notes app structure designed for teaching authentication. All backend/auth code has been replaced with clear markers showing where students need to add authentication logic.

## 📁 Project Structure

```
src/app/
├── (auth)/              # Authentication pages (grouped route)
│   ├── login/
│   │   ├── page.jsx     # Login UI (✅ Complete)
│   │   └── actions.js   # 🔴 Login backend (TODO)
│   └── signup/
│       ├── page.jsx     # Signup UI (✅ Complete)
│       └── actions.js   # 🔴 Signup backend (TODO)
│
├── (page)/              # Protected pages
│   └── notes/
│       ├── page.jsx     # Notes UI (✅ Complete, mock data)
│       └── actions.js   # 🔴 Notes backend (TODO)
│
└── lib/
    └── supabase/
        └── server.ts    # Supabase client setup (needs env vars)

```

## 🎯 Learning Objectives

By the end of this lecture, students should understand:

1. **What is authentication?** - Verifying user identity
2. **Server Actions** - How Next.js handles form submissions securely
3. **Supabase Auth** - How to integrate authentication service
4. **Protected Routes** - How to check if user is logged in
5. **User Sessions** - How auth state is maintained across requests

## 📍 Integration Points (Where to Add Auth)

There are **5 main integration points** marked with 🔴 in the code:

### Integration Point #1: Login Form Submission
**File:** `src/app/(auth)/login/page.jsx`
- Currently: Mock function that logs to console
- Students need to: Call the `login()` server action
- Teaching focus: Form submission → Server action → Auth service

### Integration Point #2: Signup Form Submission  
**File:** `src/app/(auth)/signup/page.jsx`
- Currently: Mock function that logs to console
- Students need to: Call the `signup()` server action
- Teaching focus: Creating new user vs logging in existing user

### Integration Point #3: Notes Page Auth Check
**File:** `src/app/(page)/notes/page.jsx`
- Currently: Mock user and notes data
- Students need to: 
  - Check if user is authenticated
  - Fetch real notes from database
  - Redirect if not authenticated
- Teaching focus: Protected routes, fetching user-specific data

### Integration Point #4: Logout Button
**File:** `src/app/(page)/notes/page.jsx`
- Currently: Mock logout that just redirects
- Students need to: Call `logout()` server action
- Teaching focus: Clearing session, ending auth

### Integration Point #5: Add Note Form
**File:** `src/app/(page)/notes/page.jsx`
- Currently: Adds to local state only
- Students need to: Call `addNote()` server action
- Teaching focus: Authenticated API calls, user association

## 🔨 Implementation Steps (For Teaching)

### Step 1: Login Implementation

**File:** `src/app/(auth)/login/actions.js`

Walk students through:
1. Getting email/password from `formData`
2. Creating Supabase client with `createClient()`
3. Calling `supabase.auth.signInWithPassword()`
4. Error handling
5. Redirecting on success

**Key Code:**
```javascript
const email = formData.get("email");
const password = formData.get("password");
const supabase = await createClient();
const { error } = await supabase.auth.signInWithPassword({ email, password });
if (error) throw new Error(error.message);
redirect("/notes");
```

### Step 2: Signup Implementation

**File:** `src/app/(auth)/signup/actions.js`

Similar to login but uses `signUp()` instead. Discuss:
- Email validation
- Password requirements
- "User already exists" errors

**Key Code:**
```javascript
const { error } = await supabase.auth.signUp({ email, password });
```

### Step 3: Protected Route (Notes Page)

**File:** `src/app/(page)/notes/page.jsx`

Convert back to server component and:
1. Get authenticated user: `await supabase.auth.getUser()`
2. Redirect if no user: `if (!user) redirect("/login")`
3. Fetch user's notes: `supabase.from("notes").select().eq("user_id", user.id)`

**Teaching Points:**
- Server components vs client components
- Server-side auth checks
- Filtering by user_id (security!)

### Step 4: Logout Implementation

**File:** `src/app/(page)/notes/actions.js`

Simple implementation:
1. Get Supabase client
2. Call `supabase.auth.signOut()`
3. Redirect to login

### Step 5: Add Note with Auth

**File:** `src/app/(page)/notes/actions.js`

Show students:
1. Check authentication first
2. Get user.id from auth
3. Associate note with user (`user_id: user.id`)
4. Use `revalidatePath()` to refresh data

**Key Security Point:**
```javascript
const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect("/login");

await supabase.from("notes").insert({
  title,
  user_id: user.id  // CRITICAL: Link to authenticated user
});
```

## 💡 Teaching Tips

### 1. Start with the Frontend
- Show students the beautiful UI first
- Explain that forms are ready, but don't work yet
- This helps them understand what they're building towards

### 2. Explain Server Actions
- Use "use server" directive = runs on server
- formData is automatically parsed
- Errors bubble up to client

### 3. Authentication Flow
```
User fills form → Submits → Server Action → Supabase Auth → Success/Error → Redirect
```

### 4. Security Concepts
- **Never trust the client** - always verify on server
- **Always check auth** - before protected operations
- **Filter by user_id** - users should only see their data
- **RLS + Application filtering** - defense in depth

### 5. Common Mistakes to Highlight
- ❌ Forgetting to check `if (!user)`
- ❌ Not associating notes with `user_id`
- ❌ Missing error handling
- ❌ Not redirecting after logout

## 🧪 Testing Scenarios

Have students test:
1. ✅ Successful login → redirects to notes
2. ❌ Wrong password → shows error
3. ✅ Successful signup → creates account
4. ❌ Email already exists → shows error
5. 🔒 Access `/notes` without login → redirects to login
6. ✅ Create note → appears in list
7. ✅ Logout → redirects to login
8. 🔒 After logout, accessing `/notes` → redirects to login

## 📚 Key Concepts to Explain

### 1. Server Actions
- What: Functions that run on the server
- Why: Security, database access, server-side logic
- How: `"use server"` directive, async functions

### 2. FormData API
- Automatic parsing from form submissions
- Access with `formData.get("fieldName")`
- Type handling (strings by default)

### 3. Authentication State
- Stored in cookies (handled by Supabase)
- Persists across page reloads
- Checked with `getUser()`

### 4. Protected Routes
- Check authentication before rendering
- Redirect unauthorized users
- Server-side checks are secure

### 5. User-Specific Data
- Always filter by `user_id`
- Database policies (RLS) provide backup
- Application code provides explicit intent

## 🎓 Lecture Flow Suggestion

1. **Introduction (5 min)**
   - Show the working UI (without backend)
   - Explain what we're building

2. **Server Actions Concept (10 min)**
   - What are server actions?
   - How do they work?
   - Show the "use server" directive

3. **Implement Login (15 min)**
   - Walk through step by step
   - Show error handling
   - Test together

4. **Implement Signup (10 min)**
   - Similar to login
   - Point out differences
   - Test together

5. **Protected Routes (15 min)**
   - Explain auth checking
   - Implement notes page auth
   - Show redirect behavior

6. **Adding Data with Auth (10 min)**
   - Show user association
   - Explain user_id filtering
   - Test note creation

7. **Logout (5 min)**
   - Simple implementation
   - Test session clearing

8. **Security Discussion (10 min)**
   - RLS vs application filtering
   - Best practices
   - Common mistakes

9. **Q&A and Practice (10 min)**

## 🔍 Code Search Tips for Students

Tell students to search for:
- `🔴 BACKEND AUTH INTEGRATION POINT` - All places where auth is needed
- `TODO:` - Specific implementation steps
- `MOCK:` - Code that needs to be replaced
- `TEACHING POINTS:` - Explanations of concepts

## ✅ Checklist for Students

After implementing, students should verify:
- [ ] Can log in with valid credentials
- [ ] Can sign up with new email
- [ ] Error messages show for invalid login
- [ ] Cannot access `/notes` without logging in
- [ ] Can create notes when logged in
- [ ] Notes only show for logged-in user
- [ ] Logout works and redirects to login
- [ ] Cannot access `/notes` after logout

## 📝 Additional Resources

- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- Next.js Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- Form Handling: https://react.dev/reference/react-dom/components/form

---

**Happy Teaching! 🎓**
