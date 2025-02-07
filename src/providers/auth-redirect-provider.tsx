"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSupabase } from "./supabase-provider";
import { useAccount } from "wagmi";
import { Text, Flex, Spinner } from "@chakra-ui/react";

export default function AuthRedirectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSupabase();
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const previousConnected = useRef(isConnected);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const protectedBaseRoutes = [
    "/all-nofas",
    "/create-your-nofa",
    "/your-nofas",
  ];

  const isProtectedRoute = () => {
    const isBaseRoute = protectedBaseRoutes.some((route) => pathname === route);
    if (isBaseRoute) return true;

    const isAllNofasDetail = pathname?.startsWith("/all-nofas/");
    const isYourNofasDetail = pathname?.startsWith("/your-nofas/");

    return isAllNofasDetail || isYourNofasDetail;
  };

  useEffect(() => {
    if (previousConnected.current && !isConnected) {
      setIsRedirecting(true);
      router.replace("/first-page");
    }
    previousConnected.current = isConnected;
  }, [isConnected]);

  useEffect(() => {
    if (pathname === "/") {
      setIsRedirecting(true);
      if (!user || !isConnected) {
        router.replace("/first-page");
      } else {
        router.replace("/all-nofas");
      }
    } else {
      setIsRedirecting(false);
    }
  }, [pathname]);

  if (pathname === "/first-page") {
    return <>{children}</>;
  }

  if (isProtectedRoute() && (!user || !isConnected)) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        {isRedirecting && <Spinner size="sm" />}
        <Text
          color="#0F1C33"
          fontSize="14px"
          fontWeight="normal"
          mt={isRedirecting ? 4 : 0}
        >
          Connect to continue.
        </Text>
      </Flex>
    );
  }

  return <>{children}</>;
}
