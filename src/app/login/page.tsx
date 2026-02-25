import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="px-2.5 pt-8">
      <h1 className="text-center text-4xl font-bold py-6 pb-14">Login</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
