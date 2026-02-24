"use client";
import { useEffect, useState } from "react";
import { fetchEmployeesAction } from "../actions/get-employees";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetchEmployeesAction();
      if (response.success) {
        setEmployees(response.data);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="text-center p-4">Loading team...</p>;

  return (
    <div>
      <ul className="p-4">
        {employees.map((emp) => (
          <li key={emp.id} className="border-b py-2">
            <p className="font-bold">
              {emp.first_name} {emp.last_name}
            </p>
            <p className="text-sm text-gray-300">{emp.department}</p>
          </li>
        ))}
        {employees.length === 0 && <p>No employees found.</p>}
      </ul>
    </div>
  );
}
