"use server";

import { revalidatePath } from "next/cache";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentByEmail,
  getStudentById,
  getStudentByMatricNumber,
  getStudentsByDepartment,
  updateStudent,
} from "@/db/queries/students";
import type { InsertStudent } from "@/db/schema";

export type ActionResponse<T = any> = {
  data?: T;
  error?: string;
};

export async function createStudentAction(
  data: InsertStudent
): Promise<ActionResponse> {
  try {
    // Check if student with same email exists
    const existingEmail = await getStudentByEmail(data.email);
    if (existingEmail) {
      return { error: "Student with this email already exists" };
    }

    // Check if student with same matric number exists
    const existingMatric = await getStudentByMatricNumber(data.matricNumber);
    if (existingMatric) {
      return { error: "Student with this matric number already exists" };
    }

    const student = await createStudent(data);
    revalidatePath("/students");
    return { data: student };
  } catch (error) {
    console.error("Failed to create student:", error);
    return { error: "Failed to create student" };
  }
}

export async function getStudentByIdAction(
  id: string
): Promise<ActionResponse> {
  try {
    const student = await getStudentById(id);
    if (!student) {
      return { error: "Student not found" };
    }
    return { data: student };
  } catch (error) {
    console.error("Failed to get student:", error);
    return { error: "Failed to get student" };
  }
}

export async function getAllStudentsAction(): Promise<ActionResponse> {
  try {
    const students = await getAllStudents();
    return { data: students };
  } catch (error) {
    console.error("Failed to get students:", error);
    return { error: "Failed to get students" };
  }
}

export async function getStudentsByDepartmentAction(
  departmentId: string
): Promise<ActionResponse> {
  try {
    const students = await getStudentsByDepartment(departmentId);
    return { data: students };
  } catch (error) {
    console.error("Failed to get students by department:", error);
    return { error: "Failed to get students" };
  }
}

export async function updateStudentAction(
  id: string,
  data: Partial<InsertStudent>
): Promise<ActionResponse> {
  try {
    // If email is being updated, check if it's already taken
    if (data.email) {
      const existingEmail = await getStudentByEmail(data.email);
      if (existingEmail && existingEmail.id !== id) {
        return { error: "Email already taken by another student" };
      }
    }

    // If matric number is being updated, check if it's already taken
    if (data.matricNumber) {
      const existingMatric = await getStudentByMatricNumber(data.matricNumber);
      if (existingMatric && existingMatric.id !== id) {
        return { error: "Matric number already taken by another student" };
      }
    }

    const student = await updateStudent(id, data);
    revalidatePath("/students");
    return { data: student };
  } catch (error) {
    console.error("Failed to update student:", error);
    return { error: "Failed to update student" };
  }
}

export async function deleteStudentAction(id: string): Promise<ActionResponse> {
  try {
    await deleteStudent(id);
    revalidatePath("/students");
    return { data: null };
  } catch (error) {
    console.error("Failed to delete student:", error);
    return { error: "Failed to delete student" };
  }
} 