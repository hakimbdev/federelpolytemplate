import { eq, and } from "drizzle-orm";
import { db } from "..";
import { enrollments, type InsertEnrollment, type Enrollment } from "../schema";

export async function createEnrollment(data: InsertEnrollment): Promise<Enrollment> {
  const [enrollment] = await db.insert(enrollments).values(data).returning();
  return enrollment;
}

export async function getEnrollmentById(id: string): Promise<Enrollment | undefined> {
  const [enrollment] = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.id, id));
  return enrollment;
}

export async function getAllEnrollments(): Promise<Enrollment[]> {
  return db.select().from(enrollments);
}

export async function getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
  return db
    .select()
    .from(enrollments)
    .where(eq(enrollments.studentId, studentId));
}

export async function getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]> {
  return db
    .select()
    .from(enrollments)
    .where(eq(enrollments.courseId, courseId));
}

export async function getEnrollmentByStudentAndCourse(
  studentId: string,
  courseId: string
): Promise<Enrollment | undefined> {
  const [enrollment] = await db
    .select()
    .from(enrollments)
    .where(
      and(
        eq(enrollments.studentId, studentId),
        eq(enrollments.courseId, courseId)
      )
    );
  return enrollment;
}

export async function updateEnrollment(
  id: string,
  data: Partial<InsertEnrollment>
): Promise<Enrollment> {
  const [enrollment] = await db
    .update(enrollments)
    .set(data)
    .where(eq(enrollments.id, id))
    .returning();
  return enrollment;
}

export async function deleteEnrollment(id: string): Promise<void> {
  await db.delete(enrollments).where(eq(enrollments.id, id));
} 