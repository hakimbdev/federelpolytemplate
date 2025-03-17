import { eq } from "drizzle-orm";
import { db } from "..";
import { departments, type InsertDepartment, type Department } from "../schema";

export async function createDepartment(data: InsertDepartment): Promise<Department> {
  const [department] = await db.insert(departments).values(data).returning();
  return department;
}

export async function getDepartmentById(id: string): Promise<Department | undefined> {
  const [department] = await db
    .select()
    .from(departments)
    .where(eq(departments.id, id));
  return department;
}

export async function getAllDepartments(): Promise<Department[]> {
  return db.select().from(departments);
}

export async function updateDepartment(
  id: string,
  data: Partial<InsertDepartment>
): Promise<Department> {
  const [department] = await db
    .update(departments)
    .set(data)
    .where(eq(departments.id, id))
    .returning();
  return department;
}

export async function deleteDepartment(id: string): Promise<void> {
  await db.delete(departments).where(eq(departments.id, id));
} 