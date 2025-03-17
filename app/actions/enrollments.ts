"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  getEnrollmentByStudentAndCourse,
  getEnrollmentsByCourse,
  getEnrollmentsByStudent,
  updateEnrollment,
} from "@/db/queries/enrollments";
import type { InsertEnrollment } from "@/db/schema";

export type ActionResponse<T = any> = {
  data?: T;
  error?: string;
};

export async function createEnrollmentAction(
  data: InsertEnrollment
): Promise<ActionResponse> {
  try {
    // Check if student is already enrolled in this course
    const existingEnrollment = await getEnrollmentByStudentAndCourse(
      data.studentId,
      data.courseId
    );
    if (existingEnrollment) {
      return { error: "Student is already enrolled in this course" };
    }

    const enrollment = await createEnrollment(data);
    revalidatePath("/enrollments");
    return { data: enrollment };
  } catch (error) {
    console.error("Failed to create enrollment:", error);
    return { error: "Failed to create enrollment" };
  }
}

export async function getEnrollmentByIdAction(
  id: string
): Promise<ActionResponse> {
  try {
    const enrollment = await getEnrollmentById(id);
    if (!enrollment) {
      return { error: "Enrollment not found" };
    }
    return { data: enrollment };
  } catch (error) {
    console.error("Failed to get enrollment:", error);
    return { error: "Failed to get enrollment" };
  }
}

export async function getAllEnrollmentsAction(): Promise<ActionResponse> {
  try {
    const enrollments = await getAllEnrollments();
    return { data: enrollments };
  } catch (error) {
    console.error("Failed to get enrollments:", error);
    return { error: "Failed to get enrollments" };
  }
}

export async function getEnrollmentsByStudentAction(
  studentId: string
): Promise<ActionResponse> {
  try {
    const enrollments = await getEnrollmentsByStudent(studentId);
    return { data: enrollments };
  } catch (error) {
    console.error("Failed to get enrollments by student:", error);
    return { error: "Failed to get enrollments" };
  }
}

export async function getEnrollmentsByCourseAction(
  courseId: string
): Promise<ActionResponse> {
  try {
    const enrollments = await getEnrollmentsByCourse(courseId);
    return { data: enrollments };
  } catch (error) {
    console.error("Failed to get enrollments by course:", error);
    return { error: "Failed to get enrollments" };
  }
}

export async function updateEnrollmentAction(
  id: string,
  data: Partial<InsertEnrollment>
): Promise<ActionResponse> {
  try {
    // If student or course is being updated, check for existing enrollment
    if (data.studentId && data.courseId) {
      const existingEnrollment = await getEnrollmentByStudentAndCourse(
        data.studentId,
        data.courseId
      );
      if (existingEnrollment && existingEnrollment.id !== id) {
        return { error: "Student is already enrolled in this course" };
      }
    }

    const enrollment = await updateEnrollment(id, data);
    revalidatePath("/enrollments");
    return { data: enrollment };
  } catch (error) {
    console.error("Failed to update enrollment:", error);
    return { error: "Failed to update enrollment" };
  }
}

export async function deleteEnrollmentAction(id: string): Promise<ActionResponse> {
  try {
    await deleteEnrollment(id);
    revalidatePath("/enrollments");
    return { data: null };
  } catch (error) {
    console.error("Failed to delete enrollment:", error);
    return { error: "Failed to delete enrollment" };
  }
} 