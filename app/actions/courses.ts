"use server";

import { revalidatePath } from "next/cache";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseByCode,
  getCourseById,
  getCoursesByDepartment,
  getCoursesByInstructor,
  updateCourse,
} from "@/db/queries/courses";
import type { InsertCourse } from "@/db/schema";

export type ActionResponse<T = any> = {
  data?: T;
  error?: string;
};

export async function createCourseAction(
  data: InsertCourse
): Promise<ActionResponse> {
  try {
    // Check if course with same code exists
    const existingCode = await getCourseByCode(data.code);
    if (existingCode) {
      return { error: "Course with this code already exists" };
    }

    const course = await createCourse(data);
    revalidatePath("/courses");
    return { data: course };
  } catch (error) {
    console.error("Failed to create course:", error);
    return { error: "Failed to create course" };
  }
}

export async function getCourseByIdAction(
  id: string
): Promise<ActionResponse> {
  try {
    const course = await getCourseById(id);
    if (!course) {
      return { error: "Course not found" };
    }
    return { data: course };
  } catch (error) {
    console.error("Failed to get course:", error);
    return { error: "Failed to get course" };
  }
}

export async function getAllCoursesAction(): Promise<ActionResponse> {
  try {
    const courses = await getAllCourses();
    return { data: courses };
  } catch (error) {
    console.error("Failed to get courses:", error);
    return { error: "Failed to get courses" };
  }
}

export async function getCoursesByDepartmentAction(
  departmentId: string
): Promise<ActionResponse> {
  try {
    const courses = await getCoursesByDepartment(departmentId);
    return { data: courses };
  } catch (error) {
    console.error("Failed to get courses by department:", error);
    return { error: "Failed to get courses" };
  }
}

export async function getCoursesByInstructorAction(
  instructorId: string
): Promise<ActionResponse> {
  try {
    const courses = await getCoursesByInstructor(instructorId);
    return { data: courses };
  } catch (error) {
    console.error("Failed to get courses by instructor:", error);
    return { error: "Failed to get courses" };
  }
}

export async function updateCourseAction(
  id: string,
  data: Partial<InsertCourse>
): Promise<ActionResponse> {
  try {
    // If code is being updated, check if it's already taken
    if (data.code) {
      const existingCode = await getCourseByCode(data.code);
      if (existingCode && existingCode.id !== id) {
        return { error: "Course code already taken by another course" };
      }
    }

    const course = await updateCourse(id, data);
    revalidatePath("/courses");
    return { data: course };
  } catch (error) {
    console.error("Failed to update course:", error);
    return { error: "Failed to update course" };
  }
}

export async function deleteCourseAction(id: string): Promise<ActionResponse> {
  try {
    await deleteCourse(id);
    revalidatePath("/courses");
    return { data: null };
  } catch (error) {
    console.error("Failed to delete course:", error);
    return { error: "Failed to delete course" };
  }
} 