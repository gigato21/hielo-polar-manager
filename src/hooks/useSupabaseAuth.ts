import { useContext, createContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseClient() {
  return supabase
}

const AuthContext = createContext<any>(null)

export function useSupabaseUser() {
  const context = useContext(AuthContext)
  return context?.user || null
}

// Agregar funciones para manejar la autenticación
export function useSupabaseAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Obtener el usuario actual al cargar el hook
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Ajustar el manejo de la suscripción para usar directamente el objeto devuelto
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { user, signUp, signIn, signOut };
}
