
import { useContext, createContext } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseClient() {
  return supabase
}

const AuthContext = createContext<any>(null)

export function useSupabaseUser() {
  const context = useContext(AuthContext)
  return context?.user || null
}
