interface AddEmployeeFormProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  pending: boolean;
  message?: string;
}

export default function AddEmployeeForm({
  submit,
  pending,
  message,
}: AddEmployeeFormProps) {
  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 min-w-80 p-6 border rounded-lg shadow-sm bg-base-100"
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
          <option className="text-black" value="Sales">
            Sales
          </option>
          <option className="text-black" value="Management">
            Management
          </option>
          <option className="text-black" value="Customer Service">
            Customer Service
          </option>
          <option className="text-black" value="Accounting">
            Accounting
          </option>
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-2 btn btn-primary text-white p-2 rounded font-semibold disabled:bg-gray-400 transition-colors"
      >
        {pending ? "Saving..." : "Save Employee"}
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
