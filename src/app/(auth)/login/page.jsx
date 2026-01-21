"use client";

// TODO: Uncomment this import when you implement the backend
// import { login } from "./actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    // ============================================
    // 🔴 BACKEND AUTH INTEGRATION POINT #1
    // ============================================
    // TODO: Replace this mock with actual auth call
    // 
    // When teaching, show students:
    // 1. How to get email/password from formData
    // 2. How to call the server action: await login(formData)
    // 3. How to handle errors and redirect on success
    
    const email = formData.get("email");
    const password = formData.get("password");
    
    console.log("📝 Form submitted:", { email, password });
    
    // MOCK: Simulating auth (remove this in real implementation)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    console.log("⚠️ MOCK: Authentication not implemented yet!");
    return { error: "Authentication backend not connected yet" };
    
    // TODO: Replace mock with real implementation:
    // try {
    //   await login(formData);
    //   router.push("/notes"); // Redirect on success
    //   return { error: null };
    // } catch (error) {
    //   return { error: error.message };
    // }
  }, { error: null });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {state.error && (
            <div className="text-red-500 text-sm">{state.error}</div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
