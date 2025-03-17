import React from "react";
import { getAllDepartmentsAction } from "../actions/departments";

export default async function DepartmentsPage() {
  const { data: departments, error } = await getAllDepartmentsAction();

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="grid gap-4">
        {departments?.map((dept) => (
          <div
            key={dept.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold">{dept.name}</h2>
            <p className="text-gray-600">{dept.code}</p>
            {dept.description && (
              <p className="mt-2 text-gray-700">{dept.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 