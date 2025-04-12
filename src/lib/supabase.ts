import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_PUBLIC_PROJECT_URL!
// const supabaseAnonKey = process.env.SUPABASE_PUBLIC_ANON_KEY!

const supabaseUrl = "https://ayxjhbjqonkrenvceyai.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5eGpoYmpxb25rcmVudmNleWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODE4ODIsImV4cCI6MjA2MDA1Nzg4Mn0.hN60crfld98hZHBdhvf4S_Fd8_OCI9eKiV2ThvdxwmI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})