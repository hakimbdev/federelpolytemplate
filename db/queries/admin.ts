"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertAdmin, SelectAdmin, admins } from "../schema/admin";

export const createAdmin = async (data: InsertAdmin): Promise<SelectAdmin> => {
  try {
    const [newAdmin] = await db.insert(admins).values(data).returning();
    return newAdmin;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw new Error("Failed to create admin");
  }
};

export const getAdminByEmail = async (email: string): Promise<SelectAdmin | undefined> => {
  try {
    const admin = await db.query.admins.findFirst({
      where: eq(admins.email, email),
    });
    return admin;
  } catch (error) {
    console.error("Error getting admin by email:", error);
    throw new Error("Failed to get admin");
  }
};

export const getAdminById = async (id: string): Promise<SelectAdmin | undefined> => {
  try {
    const admin = await db.query.admins.findFirst({
      where: eq(admins.id, id),
    });
    return admin;
  } catch (error) {
    console.error("Error getting admin by ID:", error);
    throw new Error("Failed to get admin");
  }
};

export const updateAdmin = async (id: string, data: Partial<InsertAdmin>): Promise<SelectAdmin> => {
  try {
    const [updatedAdmin] = await db
      .update(admins)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(admins.id, id))
      .returning();
    return updatedAdmin;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw new Error("Failed to update admin");
  }
};

export const updateAdminLastLogin = async (id: string): Promise<void> => {
  try {
    await db
      .update(admins)
      .set({ lastLogin: new Date() })
      .where(eq(admins.id, id));
  } catch (error) {
    console.error("Error updating admin last login:", error);
    throw new Error("Failed to update admin last login");
  }
};

export const deleteAdmin = async (id: string): Promise<void> => {
  try {
    await db.delete(admins).where(eq(admins.id, id));
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw new Error("Failed to delete admin");
  }
};

export const getAllAdmins = async (): Promise<SelectAdmin[]> => {
  try {
    return await db.query.admins.findMany();
  } catch (error) {
    console.error("Error getting all admins:", error);
    throw new Error("Failed to get admins");
  }
}; 