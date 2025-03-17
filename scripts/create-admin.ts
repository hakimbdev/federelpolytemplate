import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import readline from 'readline';
import crypto from 'crypto';
import { InsertAdmin } from '../db/schema/admin';
import { db } from '../db/db';
import { admins } from '../db/schema/admin';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to hash password
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to create admin
async function createAdmin() {
  try {
    // Get admin details from user input
    const email = await new Promise<string>(resolve => {
      rl.question('Enter admin email: ', resolve);
    });

    const password = await new Promise<string>(resolve => {
      rl.question('Enter admin password: ', resolve);
    });

    const firstName = await new Promise<string>(resolve => {
      rl.question('Enter admin first name: ', resolve);
    });

    const lastName = await new Promise<string>(resolve => {
      rl.question('Enter admin last name: ', resolve);
    });

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: 'admin'
        }
      }
    });

    if (authError) {
      throw new Error(`Failed to create admin auth account: ${authError.message}`);
    }

    if (!authData.user) {
      throw new Error('Failed to create user in Supabase Auth');
    }

    console.log('Admin created in Supabase Auth');

    // Create admin in database
    const adminData: InsertAdmin = {
      id: authData.user.id,
      email,
      password: hashPassword(password), // Store hashed password
      firstName,
      lastName,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const [newAdmin] = await db.insert(admins).values(adminData).returning();
    
    console.log('Admin created successfully:', {
      id: newAdmin.id,
      email: newAdmin.email,
      name: `${newAdmin.firstName} ${newAdmin.lastName}`
    });

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    rl.close();
  }
}

// Run the function
createAdmin(); 