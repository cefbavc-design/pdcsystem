import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxobpxamsdbqcxixnuno.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4b2JweGFtc2RicWN4aXhudW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjY1NjAsImV4cCI6MjEwMjQwMjU2MH0.o7aYgo_6WamNG-cztSoZH-kynCS53W177BMa4b6Ldoo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
