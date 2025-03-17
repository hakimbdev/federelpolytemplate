import { eq } from "drizzle-orm";
import { db } from "..";
import { courses, type InsertCourse, type Course } from "../schema";

export async function createCourse(data: InsertCourse): Promise<Course> {
  const [course] = await db.insert(courses).values(data).returning();
  return course;
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, id));
  return course;
}

export async function getCourseByCode(code: string): Promise<Course | undefined> {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.code, code));
  return course;
}

export async function getAllCourses(): Promise<Course[]> {
  return db.select().from(courses);
}

export async function getCoursesByDepartment(departmentId: string): Promise<Course[]> {
  return db
    .select()
    .from(courses)
    .where(eq(courses.departmentId, departmentId));
}

export async function getCoursesByInstructor(instructorId: string): Promise<Course[]> {
  return db
    .select()
    .from(courses)
    .where(eq(courses.instructorId, instructorId));
}

export async function updateCourse(
  id: string,
  data: Partial<InsertCourse>
): Promise<Course> {
  const [course] = await db
    .update(courses)
    .set(data)
    .where(eq(courses.id, id))
    .returning();
  return course;
}

export async function deleteCourse(id: string): Promise<void> {
  await db.delete(courses).where(eq(courses.id, id));
} 