"use server";

import { revalidatePath } from "next/cache";
import {
  createStaff,
  deleteStaff,
  getAllStaff,
  getStaffByEmail,
  getStaffById,
  getStaffByDepartment,
  getStaffByRole,
  updateStaff,
} from "@/db/queries/staff";
import type { InsertStaff } from "@/db/schema";

export type ActionResponse<T = any> = {
  data?: T;
  error?: string;
};

export async function createStaffAction(
  data: InsertStaff
): Promise<ActionResponse> {
  try {
    // Check if staff with same email exists
    const existingEmail = await getStaffByEmail(data.email);
    if (existingEmail) {
      return { error: "Staff member with this email already exists" };
    }

    const staffMember = await createStaff(data);
    revalidatePath("/staff");
    return { data: staffMember };
  } catch (error) {
    console.error("Failed to create staff member:", error);
    return { error: "Failed to create staff member" };
  }
}

export async function getStaffByIdAction(
  id: string
): Promise<ActionResponse> {
  try {
    const staffMember = await getStaffById(id);
    if (!staffMember) {
      return { error: "Staff member not found" };
    }
    return { data: staffMember };
  } catch (error) {
    console.error("Failed to get staff member:", error);
    return { error: "Failed to get staff member" };
  }
}

export async function getAllStaffAction(): Promise<ActionResponse> {
  try {
    const staffMembers = await getAllStaff();
    return { data: staffMembers };
  } catch (error) {
    console.error("Failed to get staff members:", error);
    return { error: "Failed to get staff members" };
  }
}

export async function getStaffByDepartmentAction(
  departmentId: string
): Promise<ActionResponse> {
  try {
    const staffMembers = await getStaffByDepartment(departmentId);
    return { data: staffMembers };
  } catch (error) {
    console.error("Failed to get staff members by department:", error);
    return { error: "Failed to get staff members" };
  }
}

export async function getStaffByRoleAction(
  role: string
): Promise<ActionResponse> {
  try {
    const staffMembers = await getStaffByRole(role);
    return { data: staffMembers };
  } catch (error) {
    console.error("Failed to get staff members by role:", error);
    return { error: "Failed to get staff members" };
  }
}

export async function updateStaffAction(
  id: string,
  data: Partial<InsertStaff>
): Promise<ActionResponse> {
  try {
    // If email is being updated, check if it's already taken
    if (data.email) {
      const existingEmail = await getStaffByEmail(data.email);
      if (existingEmail && existingEmail.id !== id) {
        return { error: "Email already taken by another staff member" };
      }
    }

    const staffMember = await updateStaff(id, data);
    revalidatePath("/staff");
    return { data: staffMember };
  } catch (error) {
    console.error("Failed to update staff member:", error);
    return { error: "Failed to update staff member" };
  }
}

export async function deleteStaffAction(id: string): Promise<ActionResponse> {
  try {
    await deleteStaff(id);
    revalidatePath("/staff");
    return { data: null };
  } catch (error) {
    console.error("Failed to delete staff member:", error);
    return { error: "Failed to delete staff member" };
  }
} 