"use server";

// TODO: Uncomment when implementing authentication
// import { createClient } from "@/lib/supabase/server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

/**
 * ============================================
 * 🔴 BACKEND AUTH IMPLEMENTATION #3: ADD NOTE
 * ============================================
 * 
 * This server action creates a new note for the authenticated user.
 * 
 * TODO STEPS FOR IMPLEMENTATION:
 * 
 * 1. Get note data from formData
 *    const title = formData.get("title");
 * 
 * 2. Create Supabase client
 *    const supabase = await createClient();
 * 
 * 3. Verify user is authenticated
 *    const { data: { user } } = await supabase.auth.getUser();
 *    if (!user) redirect("/login");
 * 
 * 4. Insert note into database
 *    await supabase.from("notes").insert({
 *      title: title.trim(),
 *      user_id: user.id,  // IMPORTANT: Associate note with user
 *    });
 * 
 * 5. Refresh the page data
 *    revalidatePath("/notes");
 * 
 * TEACHING POINTS:
 * - Always check authentication before database operations
 * - user_id links the note to the user (security!)
 * - revalidatePath() refreshes the page with new data
 * - Never trust client data - always validate on server
 */

export async function addNote(formData) {
  // ============ STEP 1: Get form data ============
  // TODO: Extract title from formData
  // const title = formData.get("title");
  
  // ============ STEP 2: Create Supabase client ============
  // TODO: Initialize Supabase client
  // const supabase = await createClient();
  // if (!supabase) {
  //   throw new Error("Database connection failed");
  // }
  
  // ============ STEP 3: Check authentication ============
  // TODO: Verify user is logged in
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) {
  //   redirect("/login");
  // }
  
  // ============ STEP 4: Validate input ============
  // TODO: Check that title is not empty
  // if (!title || title.trim() === "") {
  //   throw new Error("Note title is required");
  // }
  
  // ============ STEP 5: Insert note into database ============
  // TODO: Save note to database with user_id
  // const { error } = await supabase.from("notes").insert({
  //   title: title.trim(),
  //   content: null,
  //   user_id: user.id,  // CRITICAL: Link note to user!
  // });
  // 
  // if (error) {
  //   throw new Error("Failed to add note");
  // }
  
  // ============ STEP 6: Refresh page data ============
  // TODO: Revalidate the notes page to show new note
  // revalidatePath("/notes");
  
  // TEMPORARY: Remove this once you implement the above
  throw new Error("Add note function not implemented yet! Complete the TODO steps above.");
}

/**
 * ============================================
 * 🔴 BACKEND AUTH IMPLEMENTATION #4: LOGOUT
 * ============================================
 * 
 * This server action logs out the current user.
 * 
 * TODO STEPS FOR IMPLEMENTATION:
 * 
 * 1. Create Supabase client
 *    const supabase = await createClient();
 * 
 * 2. Sign out the user
 *    await supabase.auth.signOut();
 * 
 * 3. Redirect to login page
 *    redirect("/login");
 * 
 * TEACHING POINTS:
 * - signOut() clears the authentication session
 * - Cookies are automatically cleared by Supabase
 * - User must be redirected after logout
 */

export async function logout() {
  // ============ STEP 1: Create Supabase client ============
  // TODO: Initialize Supabase client
  // const supabase = await createClient();
  
  // ============ STEP 2: Sign out user ============
  // TODO: Call signOut() to clear session
  // if (supabase) {
  //   await supabase.auth.signOut();
  // }
  
  // ============ STEP 3: Redirect to login ============
  // TODO: Redirect user to login page
  // redirect("/login");
  
  // TEMPORARY: Remove this once you implement the above
  throw new Error("Logout function not implemented yet! Complete the TODO steps above.");
}
