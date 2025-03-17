"use server";

import { revalidatePath } from "next/cache";
import {
  createAdmin,
  deleteAdmin,
  getAdminByEmail,
  getAdminById,
  updateAdmin,
  updateAdminLastLogin
} from "@/db/queries/admin";
import type { InsertAdmin } from "@/db/schema/admin";
import { createClient } from "@/lib/supabase/server";

type ActionResponse = {
  success: boolean;
  error?: string;
  data?: any;
};

export async function createAdminAction(
  data: InsertAdmin
): Promise<ActionResponse> {
  try {
    // Check if admin with this email already exists
    const existingAdmin = await getAdminByEmail(data.email);
    if (existingAdmin) {
      return { success: false, error: "Admin with this email already exists" };
    }

    const newAdmin = await createAdmin(data);
    revalidatePath("/admin");
    return { success: true, data: newAdmin };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create admin" };
  }
}

export async function loginAdminAction(
  email: string,
  password: string
): Promise<ActionResponse> {
  try {
    const supabase = createClient();
    
    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: "Invalid email or password" };
    }

    // Check if user has admin role
    if (data.user?.user_metadata.role !== "admin") {
      await supabase.auth.signOut();
      return { success: false, error: "Unauthorized access" };
    }

    // Update last login time
    const admin = await getAdminByEmail(email);
    if (admin) {
      await updateAdminLastLogin(admin.id);
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed" };
  }
}

export async function logoutAdminAction(): Promise<ActionResponse> {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath("/admin/login");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Logout failed" };
  }
}

export async function getAdminByIdAction(
  id: string
): Promise<ActionResponse> {
  try {
    const admin = await getAdminById(id);
    if (!admin) {
      return { success: false, error: "Admin not found" };
    }
    return { success: true, data: admin };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to get admin" };
  }
}

export async function updateAdminAction(
  id: string,
  data: Partial<InsertAdmin>
): Promise<ActionResponse> {
  try {
    // If email is being updated, check if it's already in use
    if (data.email) {
      const existingAdmin = await getAdminByEmail(data.email);
      if (existingAdmin && existingAdmin.id !== id) {
        return { success: false, error: "Email already in use by another admin" };
      }
    }

    const updatedAdmin = await updateAdmin(id, data);
    revalidatePath("/admin");
    return { success: true, data: updatedAdmin };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update admin" };
  }
}

export async function deleteAdminAction(id: string): Promise<ActionResponse> {
  try {
    await deleteAdmin(id);
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete admin" };
  }
} 