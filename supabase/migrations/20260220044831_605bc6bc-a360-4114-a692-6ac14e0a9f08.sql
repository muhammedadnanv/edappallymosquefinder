
-- Table to store push notification subscriptions
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a subscription (no auth required for anonymous push)
CREATE POLICY "Anyone can subscribe to notifications"
ON public.push_subscriptions
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read subscriptions (needed by edge function)
CREATE POLICY "Anyone can read subscriptions"
ON public.push_subscriptions
FOR SELECT
USING (true);

-- Allow anyone to delete their subscription by endpoint
CREATE POLICY "Anyone can unsubscribe"
ON public.push_subscriptions
FOR DELETE
USING (true);
