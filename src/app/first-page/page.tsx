"use client";

import { BodyLogoFirstPage } from "@/components/nyfa/svg-icons/logos/body-logo-first-page";
import { useSupabase } from "@/providers/supabase-provider";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Toaster, toaster } from "@/components/chakra/ui/toaster";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";

// import html2canvas from "html2canvas";
// import { useRef } from "react";

export default function FirstPage() {
  const [isCreatingAnonUser, setIsCreatingAnonUser] = useState(false);

  const { supabase } = useSupabase();
  const { address} = useAccount();

  const router = useRouter();

  const handleAnonymousSignIn = async () => {
    setIsCreatingAnonUser(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const privyWalletId: string | null = user?.user_metadata["privyWalletId"];

      if (!address) {
        toaster.create({
          description: "Connect to Nyfa before getting started.",
          duration: 3000,
          type: "info",
        });
        setIsCreatingAnonUser(false);
        return;
      }

      if (user) {
        toaster.create({
          description: "Already signed in!",
          duration: 3000,
          type: "info",
        });
        setIsCreatingAnonUser(false);

        return;
      } else {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;

        const { data: updatedUser, error: updateError } =
          await supabase.auth.updateUser({
            data: { userWalletAddress: address },
          });

        if (updateError) throw updateError;

        const response = await fetch("/api/wallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            privyWalletId: privyWalletId,
            userWalletAddress: address,
            authId: updatedUser?.user.id,
          }),
        });

        console.log(response);

        const {
          privyWalletId: _privyWalletId,
          privyWalletAddress: _privyWalletAddress,
        }: { privyWalletId: string; privyWalletAddress: string } =
          await response.json();

        const {
          data: updatedUserAddPrivyWalletId,
          error: updatedUserAddPrivyWalletIdError,
        } = await supabase.auth.updateUser({
          data: {
            privyWalletId: _privyWalletId,
            privyWalletAddress: _privyWalletAddress,
          },
        });

        if (updatedUserAddPrivyWalletIdError)
          throw updatedUserAddPrivyWalletIdError;

        const { error: insertError } = await supabase.from("CREATORS").insert([
          {
            authId: updatedUserAddPrivyWalletId?.user?.id,
            userWalletAddress: address,
            privyWalletAddress: _privyWalletAddress,
            privyWalletId: _privyWalletId,
          },
        ]);

        if (insertError) throw insertError;

        toaster.create({
          description: "Successfully signed in with wallet!",
          duration: 3000,
          type: "success",
        });

        setIsCreatingAnonUser(false);

        router.push("/all-nofas");

        return;
      }
    } catch (error) {
      setIsCreatingAnonUser(false);

      toaster.create({
        description:
          error instanceof Error ? error.message : "Authentication failed",
        duration: 3000,
        type: "error",
      });
      console.error("Error:", error);

      return;
    }
  };

  return (
    <>
      <Toaster />
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        <BodyLogoFirstPage />
        <Text color={"#0F1C33"} fontSize={"40px"} fontWeight={"bold"} mt={8}>
          nyfa*
        </Text>

        <Text color={"#EA5D5D"} fontSize={"24px"} fontWeight={"normal"} mt={4}>
          not your financial advisor
        </Text>

        <Button
          bgColor={"#FDBB23"}
          borderRadius={15}
          mt={12}
          px={16}
          w={"3/6"}
          onClick={handleAnonymousSignIn}
          loading={isCreatingAnonUser}
          loadingText={<Spinner size="sm" color="default" />}
        >
          <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
            Get started
          </Text>
        </Button>

        {/* <Button bgColor={"#FDBB23"} borderRadius={15} mt={12} px={16} w={"3/6"}>
          <Spinner size="sm" color="default" />
        </Button> */}
      </Flex>

      <Box bg="#0F1C33" position="absolute" bottom="0" right="0" py={4}>
        <Text
          color={"white"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mx={16}
          textAlign={"center"}
        >
          *nyfa (not her real name) makes it easy for anyone to do their own
          crypto research.
        </Text>
      </Box>
    </>
  );
}
