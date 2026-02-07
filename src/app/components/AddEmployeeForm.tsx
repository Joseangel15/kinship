"use client";

import { useState } from "react";
import { addEmployee } from "../actions/employee";

export default function AddEmployeeForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await addEmployee(formData);

    setIsPending(false);

    if (result.success) {
      setMessage("✅ Employee added successfully!");
      (event.target as HTMLFormElement).reset();
    } else {
      setMessage("❌ Error: Could not save employee.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md p-6 border rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-bold mb-2">Add New Employee</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="John"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Doe"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="john@kinship.com"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="department" className="text-sm font-medium">
          Department
        </label>
        <select
          id="department"
          name="department"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option className="text-black" value="Engineering">
            Engineering
          </option>
          <option className="text-black" value="Design">
            Design
          </option>
          <option className="text-black" value="Operations">
            Operations
          </option>
          <option className="text-black" value="HR">
            HR
          </option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {isPending ? "Saving..." : "Add Employee"}
      </button>
      {message && (
        <p
          className={`text-sm mt-2 font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
