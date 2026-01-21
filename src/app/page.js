import Image from "next/image";

export default function Home() {
  return (
    //Home page Welcome to notes app
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to Notes App</h1>
        <div className="flex space-x-4">
          <a
            href="/login"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Login
          </a>
          <a
            href="/signup"
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Sign Up
          </a>
        </div>
      </div>
    </main>

  );
}
