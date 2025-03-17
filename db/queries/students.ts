import { eq } from "drizzle-orm";
import { db } from "..";
import { students, type InsertStudent, type Student } from "../schema";

export async function createStudent(data: InsertStudent): Promise<Student> {
  const [student] = await db.insert(students).values(data).returning();
  return student;
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.id, id));
  return student;
}

export async function getStudentByEmail(email: string): Promise<Student | undefined> {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.email, email));
  return student;
}

export async function getStudentByMatricNumber(matricNumber: string): Promise<Student | undefined> {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.matricNumber, matricNumber));
  return student;
}

export async function getAllStudents(): Promise<Student[]> {
  return db.select().from(students);
}

export async function getStudentsByDepartment(departmentId: string): Promise<Student[]> {
  return db
    .select()
    .from(students)
    .where(eq(students.departmentId, departmentId));
}

export async function updateStudent(
  id: string,
  data: Partial<InsertStudent>
): Promise<Student> {
  const [student] = await db
    .update(students)
    .set(data)
    .where(eq(students.id, id))
    .returning();
  return student;
}

export async function deleteStudent(id: string): Promise<void> {
  await db.delete(students).where(eq(students.id, id));
} 