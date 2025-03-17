import { supabase } from '../../lib/supabase';

export async function loginAdminAction(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Check if user has admin role
    if (!data.user?.user_metadata?.role || data.user.user_metadata.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Unauthorized access');
    }

    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function logoutAdminAction() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
} 