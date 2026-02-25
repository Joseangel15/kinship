"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/auth";

export default function LoginForm() {
  // state: the return value from your action
  // formAction: the function you pass to the form 'action' prop
  // isPending: true while the server action is running
  const [state, formAction, isPending] = useActionState(
    async (
      _state: { success: boolean; error: string } | null,
      formData: FormData,
    ) => {
      return await registerUser(formData);
    },
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 min-w-80">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        required
        className="input input-bordered w-full"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="input input-bordered w-full"
        autoComplete="username"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="input input-bordered w-full"
        autoComplete="current-password"
      />

      {/* Show error messages from the server if they exist */}
      {state?.error && (
        <div className="text-error text-sm font-medium bg-error/10 p-2 rounded">
          {state.error}
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Register"
        )}
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="link">
          Log in
        </a>
      </p>
    </form>
  );
}
