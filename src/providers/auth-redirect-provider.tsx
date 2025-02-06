"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "./supabase-provider"; 
import { useAccount } from "wagmi";

export default function AuthRedirectProvider({
 children,
}: {
 children: React.ReactNode;
}) {
 const { user } = useSupabase();
 const router = useRouter();
 const pathname = usePathname();

 useEffect(() => {
   // Handle root path redirects
   if (pathname === '/') {
     if (!user) {
       router.push('/first-page');
     } else {
       router.push('/your-nofas');
     }
   }
 }, [user, pathname, router]);

 // Protect all routes except first-page
 if (!user && pathname !== '/first-page') {
   router.push('/first-page');
   return null;
 }

 return <>{children}</>;
}