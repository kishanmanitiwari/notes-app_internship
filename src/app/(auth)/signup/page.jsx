"use client";

import { signup } from "./actions";
import { useActionState } from "react";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    try {
      await signup(formData);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
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
