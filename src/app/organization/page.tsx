import AddEmployeeForm from "../components/AddEmployeeForm";

export default function OrganizationHome() {
  return (
    <main className="px-2.5">
      <h1 className="text-center text-4xl font-bold py-3.5">
        Organization
      </h1>
      <div>
        
      </div>
      <div className="flex flex-col items-center">
        <AddEmployeeForm />
      </div>
    </main>
  );
}
