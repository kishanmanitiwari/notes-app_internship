import { login } from "./actions";

export default function LoginPage() {
  return (
    <form action={login} className="p-10 space-y-3">
      <input name="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
}
