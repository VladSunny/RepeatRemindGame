import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://rmkjvfrfwhabloetjzsd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJta2p2ZnJmd2hhYmxvZXRqenNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4NjIxMTEsImV4cCI6MjAxMzQzODExMX0.LT2qp8c7sBBV4C9ouVDWbxU9M-Y588l7Kq3WljPB-8k')