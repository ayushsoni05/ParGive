import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  subscription_status: 'active' | 'inactive' | 'lapsed';
  plan_type: 'monthly' | 'yearly';
  charity_id: string | null;
  charity_percentage: number;
  stripe_customer_id: string | null;
  created_at: string;
};

export type GolfScore = {
  id: string;
  user_id: string;
  score: number;
  date: string;
  created_at: string;
};

export type Charity = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  impact_summary: string;
  website_url?: string;
};

export type Draw = {
  id: string;
  draw_date: string;
  winning_numbers: number[];
  total_prize_pool: number;
  status: 'simulation' | 'published';
};

export type Winner = {
  id: string;
  draw_id: string;
  user_id: string;
  match_type: '3-match' | '4-match' | '5-match';
  prize_amount: number;
  proof_url: string | null;
  status: 'pending' | 'paid' | 'rejected';
};
