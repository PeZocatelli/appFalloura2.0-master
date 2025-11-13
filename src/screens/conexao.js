import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wqdghvqgklrgvkrklqjv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZGdodnFna2xyZ3ZrcmtscWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzA2MDQsImV4cCI6MjA3ODQ0NjYwNH0.CmeddpeHfRSd-I1fFJFC4Q-9Khck19y9rfmAmqARC3c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
