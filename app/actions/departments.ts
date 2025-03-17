"use server";

import { revalidatePath } from "next/cache";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "@/db/queries/departments";
import type { InsertDepartment } from "@/db/schema";

export type ActionResponse<T = any> = {
  data?: T;
  error?: string;
};

export async function createDepartmentAction(
  data: InsertDepartment
): Promise<ActionResponse> {
  try {
    const department = await createDepartment(data);
    revalidatePath("/departments");
    return { data: department };
  } catch (error) {
    console.error("Failed to create department:", error);
    return { error: "Failed to create department" };
  }
}

export async function getDepartmentByIdAction(
  id: string
): Promise<ActionResponse> {
  try {
    const department = await getDepartmentById(id);
    if (!department) {
      return { error: "Department not found" };
    }
    return { data: department };
  } catch (error) {
    console.error("Failed to get department:", error);
    return { error: "Failed to get department" };
  }
}

export async function getAllDepartmentsAction(): Promise<ActionResponse> {
  try {
    const departments = await getAllDepartments();
    return { data: departments };
  } catch (error) {
    console.error("Failed to get departments:", error);
    return { error: "Failed to get departments" };
  }
}

export async function updateDepartmentAction(
  id: string,
  data: Partial<InsertDepartment>
): Promise<ActionResponse> {
  try {
    const department = await updateDepartment(id, data);
    revalidatePath("/departments");
    return { data: department };
  } catch (error) {
    console.error("Failed to update department:", error);
    return { error: "Failed to update department" };
  }
}

export async function deleteDepartmentAction(id: string): Promise<ActionResponse> {
  try {
    await deleteDepartment(id);
    revalidatePath("/departments");
    return { data: null };
  } catch (error) {
    console.error("Failed to delete department:", error);
    return { error: "Failed to delete department" };
  }
} 