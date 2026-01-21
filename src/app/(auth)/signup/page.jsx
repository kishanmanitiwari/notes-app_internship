import { signup } from "./actions";

export default function SignupPage() {
  return (
    <form action={signup} className="p-10 space-y-3">
      <input name="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <button>Signup</button>
    </form>
  );
}
