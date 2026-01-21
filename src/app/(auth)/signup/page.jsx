"use client";

// TODO: Uncomment this import when you implement the backend
// import { signup } from "./actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    // ============================================
    // 🔴 BACKEND AUTH INTEGRATION POINT #2
    // ============================================
    // TODO: Replace this mock with actual signup call
    //
    // When teaching, show students:
    // 1. How signup differs from login (creates new user)
    // 2. How to validate password requirements
    // 3. How to handle email already exists errors
    
    const email = formData.get("email");
    const password = formData.get("password");
    
    console.log("📝 Signup form submitted:", { email, password });
    
    // MOCK: Simulating signup (remove this in real implementation)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    console.log("⚠️ MOCK: Signup backend not implemented yet!");
    return { error: "Signup backend not connected yet" };
    
    // TODO: Replace mock with real implementation:
    // try {
    //   await signup(formData);
    //   router.push("/notes"); // Redirect on success
    //   return { error: null };
    // } catch (error) {
    //   return { error: error.message };
    // }
  }, { error: null });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              minLength={6}
            />
          </div>
          {state.error && (
            <div className="text-red-500 text-sm">{state.error}</div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
