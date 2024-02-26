import { Database } from '@db/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

/**
 * Gets the current session from supabase, refreshing if necessary.
 * @returns session data
 */
export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

/**
 * Gets the details of a single user.
 * @returns user details in JSON format.
 */
export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

/**
 * Gets all active products.
 * @returns an array of products that are currently active
 */
export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('metadata->index');

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};

/**
 * Gets all purchases a user has made.
 * @returns an array of all purchases the user has made.
 */
export async function getUserPurchases(userID: number) {
    const supabase = createServerSupabaseClient();
    try {
        const {data: userPurchases} = await supabase
            .from('purchases')
            .select('*')
            .eq('user_id', userID);
        return userPurchases;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}