-- ParGive Supabase Schema - Initial Migration

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Linked to Auth.Users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'lapsed')),
    plan_type TEXT CHECK (plan_type IN ('monthly', 'yearly')),
    charity_id UUID,
    charity_percentage INT DEFAULT 10,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Charities Table
CREATE TABLE public.charities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image_url TEXT,
    impact_summary TEXT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Golf Scores Table (Rolling 5 logic handled app-side or via trigger)
CREATE TABLE public.scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INT NOT NULL CHECK (score >= 1 AND score <= 45),
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Draws Table
CREATE TABLE public.draws (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_date TIMESTAMP WITH TIME ZONE NOT NULL,
    winning_numbers INT[] NOT NULL,
    total_prize_pool NUMERIC(15, 2) NOT NULL,
    status TEXT DEFAULT 'simulation' CHECK (status IN ('simulation', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Winners Table
CREATE TABLE public.winners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_id UUID REFERENCES public.draws(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    match_type TEXT NOT NULL CHECK (match_type IN ('3-match', '4-match', '5-match')),
    prize_amount NUMERIC(15, 2) NOT NULL,
    proof_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Add Charity ID Link
ALTER TABLE public.profiles ADD CONSTRAINT fk_charity FOREIGN KEY (charity_id) REFERENCES public.charities(id);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;

-- 9. Basic RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view all charities" ON public.charities FOR SELECT USING (true);
CREATE POLICY "Users can view/manage own scores" ON public.scores FOR ALL USING (auth.uid() = user_id);
