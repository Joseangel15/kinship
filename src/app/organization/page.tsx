"use client";

import { useEffect, useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { addEmployee } from "../actions/employee";

export default function OrganizationHome() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleShowForm = () => dialogRef.current?.showModal();

  const handleCloseForm = () => {
    dialogRef.current?.close();
    setFormKey(prev => prev + 1);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await addEmployee(formData);

    setIsPending(false);

    if (result.success) {
      setMessage("✅ Employee added successfully!");

      setTimeout(() => {
        (event.target as HTMLFormElement).reset();
        handleCloseForm();
        setMessage("");
        setRefreshKey(prev => prev + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setMessage("❌ Error: Could not save employee.");
      }, 2000);
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        handleCloseForm();
      }
    };

    dialog?.addEventListener("click", handleClick);
    return () => dialog?.removeEventListener("click", handleClick);
  }, []);

  return (
    <main className="px-2.5 pt-8">
      <h1 className="text-center text-4xl font-bold py-6 pb-14">Organization</h1>
      <div className="flex gap-5 justify-baseline max-w-6xl m-auto">
        <div className="flex flex-col items-center bg-base-200 w-[20%] p-4 rounded-md">
          <button className="btn btn-primary mb-2 w-full" onClick={handleShowForm}>
            Add Employee
          </button>
        </div>
        <div className="bg-base-200 flex-col w-[80%] rounded-md">
          <div>
            <h2 className="text-2xl p-4">Employees</h2>
          </div>
          <div>
            <EmployeeList key={refreshKey}/>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} className="m-auto bg-transparent backdrop:bg-black/50">
        <span>
          <XCircleIcon
            className="w-6 absolute right-1 top-1 cursor-pointer"
            onClick={handleCloseForm}
          />
        </span>
        <div>
          <AddEmployeeForm
            key={formKey}
            submit={handleSubmit}
            pending={isPending}
            message={message}
          />
        </div>
      </dialog>
    </main>
  );
}
