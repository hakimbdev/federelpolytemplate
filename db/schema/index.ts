import { integer, pgTable, text, timestamp, uuid, varchar, boolean, foreignKey } from "drizzle-orm/pg-core";
import { admins } from "./admin";

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const staff = pgTable("staff", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 20 }),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  departmentId: uuid("department_id").references(() => departments.id),
  role: varchar("role", { length: 50 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  credits: integer("credits").notNull(),
  departmentId: uuid("department_id").references(() => departments.id),
  instructorId: uuid("instructor_id").references(() => staff.id),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  matricNumber: varchar("matric_number", { length: 20 }).notNull().unique(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  departmentId: uuid("department_id").references(() => departments.id),
  dateOfBirth: timestamp("date_of_birth"),
  gender: varchar("gender", { length: 10 }),
  address: text("address"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const enrollments = pgTable("enrollments", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id").references(() => students.id),
  courseId: uuid("course_id").references(() => courses.id),
  enrollmentDate: timestamp("enrollment_date").defaultNow().notNull(),
  grade: varchar("grade", { length: 2 }),
  status: varchar("status", { length: 20 }).notNull().default('enrolled'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Export types
export type Department = typeof departments.$inferSelect;
export type InsertDepartment = typeof departments.$inferInsert;

export type Staff = typeof staff.$inferSelect;
export type InsertStaff = typeof staff.$inferInsert;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

export type Student = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// Export admin schema
export * from "./admin";

// Import all schema tables
import { exampleTable } from "./example-schema";

// Export all tables
export * from "./example-schema"; 