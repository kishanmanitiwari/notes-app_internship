"use server";

// TODO: Uncomment when implementing authentication
// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";

/**
 * ============================================
 * 🔴 BACKEND AUTH IMPLEMENTATION #2: SIGNUP
 * ============================================
 * 
 * This is a server action that handles user registration.
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
 * 3. Create new user account with Supabase
 *    const { error } = await supabase.auth.signUp({
 *      email,
 *      password,
 *    });
 * 
 * 4. Handle errors (email already exists, weak password, etc.)
 *    if (error) {
 *      throw new Error(error.message);
 *    }
 * 
 * 5. Redirect on success
 *    redirect("/notes");
 * 
 * TEACHING POINTS:
 * - signUp() creates a new user account
 * - Supabase automatically handles password hashing
 * - Email verification can be enabled in Supabase settings
 * - Similar structure to login, but uses signUp() instead
 * - Handle common errors: "User already registered", "Password too weak"
 */

export async function signup(formData) {
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
  
  // ============ STEP 3: Create user account ============
  // TODO: Call Supabase auth.signUp()
  // const { error } = await supabase.auth.signUp({
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
  throw new Error("Signup function not implemented yet! Complete the TODO steps above.");
}
