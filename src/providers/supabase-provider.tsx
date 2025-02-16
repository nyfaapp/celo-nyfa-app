"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { useCreatorStore } from "@/stores/creator";
import { Creator } from "@/types/creator";
import mixpanel from "mixpanel-browser";


type SupabaseContext = {
  supabase: SupabaseClient;
  user: User | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

 const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
 const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClientComponentClient({supabaseUrl, supabaseKey}));
  const [user, setUser] = useState<User | null>(null);
  const fetchCreator = useCreatorStore((state) => state.fetchCreator);
  const creator = useCreatorStore((state) => state.creator);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        fetchCreator(supabase, currentUser.id);
        mixpanel.identify(currentUser.id);
        mixpanel.people.set({
          $distinct_id: currentUser.id,
          ...creator,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchCreator]);

  return (
    <Context.Provider value={{ supabase, user }}>{children}</Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return context;
};
