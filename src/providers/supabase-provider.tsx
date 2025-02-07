'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { useCreatorStore } from '@/stores/creator'
import { Creator } from '@/types/creator'

type SupabaseContext = {
  supabase: SupabaseClient
  user: User | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => createClientComponentClient())
  const [user, setUser] = useState<User | null>(null)
  const fetchCreator = useCreatorStore(state => state.fetchCreator)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser?.id) {
        fetchCreator(currentUser.id);
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchCreator])

  return (
    <Context.Provider value={{ supabase, user }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}