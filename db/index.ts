import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { supabase } from "@/lib/supabase";

// Initialize Postgres client with Supabase connection
const connectionString = import.meta.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('Missing DATABASE_URL environment variable');
}

const client = postgres(connectionString, {
  max: 1,
  ssl: 'require',
});

// Initialize Drizzle with all schemas
export const db = drizzle(client, { schema });

// Export schema and Supabase client for convenience
export { schema, supabase }; 