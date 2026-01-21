"use server";

// TODO: Uncomment when implementing authentication
// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";

/**
 * ============================================
 * 🔴 BACKEND AUTH IMPLEMENTATION #1: LOGIN
 * ============================================
 * 
 * This is a server action that handles user login.
 * 
 * TODO STEPS FOR IMPLEMENTATION:
 * 
 * 1. Extract email and password from formData
 *    const email = formData.get("email");
 *    const password = formData.get("password");
 * 
 * 2. Create Supabase client
 *    const supabase = await createClient();
 * 
 * 3. Authenticate user with Supabase
 *    const { error } = await supabase.auth.signInWithPassword({
 *      email,
 *      password,
 *    });
 * 
 * 4. Handle errors
 *    if (error) {
 *      throw new Error(error.message);
 *    }
 * 
 * 5. Redirect on success
 *    redirect("/notes");
 * 
 * TEACHING POINTS:
 * - Server actions run on the server (note "use server" directive)
 * - formData is automatically parsed from the form submission
 * - Supabase handles password verification securely
 * - Errors bubble up to the client component
 * - redirect() is a Next.js server-side redirect function
 */

export async function login(formData) {
  // ============ STEP 1: Get form data ============
  // TODO: Extract email and password
  // const email = formData.get("email");
  // const password = formData.get("password");
  
  // ============ STEP 2: Create Supabase client ============
  // TODO: Initialize Supabase client
  // const supabase = await createClient();
  // if (!supabase) {
  //   throw new Error("Database connection failed");
  // }
  
  // ============ STEP 3: Authenticate user ============
  // TODO: Call Supabase auth.signInWithPassword()
  // const { error } = await supabase.auth.signInWithPassword({
  //   email,
  //   password,
  // });
  
  // ============ STEP 4: Handle errors ============
  // TODO: Check for errors and throw if found
  // if (error) {
  //   throw new Error(error.message);
  // }
  
  // ============ STEP 5: Redirect on success ============
  // TODO: Redirect to notes page
  // redirect("/notes");
  
  // TEMPORARY: Remove this once you implement the above
  throw new Error("Login function not implemented yet! Complete the TODO steps above.");
}
