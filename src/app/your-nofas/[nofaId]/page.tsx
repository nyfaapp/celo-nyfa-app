"use client";

import { Toaster, toaster } from "@/components/chakra/ui/toaster";
import AgentStreamComponent from "@/components/nyfa/agent-stream";
import CoinInfo from "@/components/nyfa/components/coin-info";
import CoinPerspectiveSection from "@/components/nyfa/components/coin-perspective";
import Footer from "@/components/nyfa/components/footer";
import HeadlineSection from "@/components/nyfa/components/headline-section";
import NoFAHeader from "@/components/nyfa/components/nofa-header";
import TokenomicsSection from "@/components/nyfa/components/tokenomics-section";
import { LoveIcon } from "@/components/nyfa/svg-icons/love-icon";
import { useSupabase } from "@/providers/supabase-provider";
import { useCreatorStore } from "@/stores/creator";
import { useNoFAStore } from "@/stores/nofa";
import { Text, Flex, Button } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

export default function YourParticularNoFA() {
  const { nofa } = useNoFAStore();
  const flexRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCreatingNFT, setIsCreatingNFT] = useState(false);
  const setNoFAFromData = useNoFAStore((state) => state.setNoFAFromData);

  const { user, supabase } = useSupabase();

    const creator = useCreatorStore(state => state.creator)
  

  const uploadToIPFS = async () => {
    setIsCreatingNFT(true);

    const file = await createNoFAPNG();

    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
        formData.append(
          "name",
          `NoFA ${nofa?.id?.substring(0, 3)}-${nofa?.coinId?.substring(0, 3)}`
        );

        const response = await fetch("/api/uploadToPinata", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload to Pinata");
        }

        const fromPinata = await response.json();

        const ipfsHash: string = fromPinata.ipfsHash;

        const { data, error } = await supabase
          .from("NOFAS")
          .update({ ipfsURI: `ipfs://${ipfsHash}` })
          .eq("id", nofa?.id) // Assuming nofa.id is the identifier for the record
          .single();

        const updatedNofa = {
          ...nofa,
          ipfsURI: `ipfs://${ipfsHash}`,
        };

        setNoFAFromData(updatedNofa);

        if (error) throw error;

        toaster.create({
          description: "Uploaded to IPFS and updated in database",
          duration: 3000,
          type: "success",
        });
      } else {
        toaster.create({
          description:
            "No file exists. Download the NoFA first before you create an NFT.",
          duration: 3000,
          type: "info",
        });
      }
    } catch (error) {
      console.error("Error uploading to IPFS image:", error);
    } finally {
      setIsCreatingNFT(false);
    }
  };

  const createNoFAPNG = async () => {
    if (!flexRef.current) return null;

    try {
      // Initial delay for React rendering
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const element = flexRef.current;
      const standardWidth = 450;

      // Create container with specific styles
      const container = document.createElement("div");
      Object.assign(container.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: `${standardWidth}px`,
        backgroundColor: "#FFFFFF",
        margin: "0",
        padding: "0",
        opacity: "1",
        zIndex: "-1000",
      });
      document.body.appendChild(container);

      // Clone and prepare element
      const clone = element.cloneNode(true) as HTMLElement;

      // Handle all images in the clone
      const images = clone.getElementsByTagName("img");
      await Promise.all(
        Array.from(images).map(async (img) => {
          if (img.src.startsWith("http")) {
            try {
              const proxyUrl = `/api/proxyImages?url=${encodeURIComponent(
                img.src
              )}`;
              const response = await fetch(proxyUrl);
              const blob = await response.blob();

              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  img.src = reader.result as string;
                  img.onload = resolve;
                };
                reader.readAsDataURL(blob);
              });
            } catch (error) {
              console.error("Error processing image:", error);
              return Promise.resolve();
            }
          }
          return Promise.resolve();
        })
      );

      // Handle iframes - replace with placeholders
      const iframeContainers = clone.querySelectorAll('[bg="#0F1C33"]');
      iframeContainers.forEach((container) => {
        const placeholder = document.createElement("div");
        placeholder.style.width = "100%";
        placeholder.style.height = "305px"; // Match your iframe height
        placeholder.style.backgroundColor = "#0F1C33";

        // Remove the iframe and add placeholder
        const iframe = container.querySelector("iframe");
        if (iframe) {
          iframe.remove();
          container.appendChild(placeholder);
        }
      });

      // Set clone styles
      Object.assign(clone.style, {
        width: `${standardWidth}px`,
        height: "auto",
        position: "static",
        transform: "none",
        margin: "0",
        padding: "8px",
        opacity: "1",
        backgroundColor: "#E2E8F0",
      });

      container.appendChild(clone);

      // Force layout calculation and wait a bit
      container.offsetHeight;
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get actual height after all content is loaded
      const actualHeight =
        Math.max(
          clone.getBoundingClientRect().height,
          clone.scrollHeight,
          clone.clientHeight,
          container.scrollHeight
        ) + 150;

      // Set container height
      container.style.height = `${actualHeight}px`;
      container.style.minHeight = `${actualHeight}px`;

      // Create canvas with specific options
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FFFFFF",
        width: standardWidth,
        height: actualHeight,
        windowWidth: standardWidth,
        windowHeight: actualHeight,
        logging: true,
        onclone: (doc) => {
          const images = doc.getElementsByTagName("img");
          return Promise.all(
            Array.from(images).map((img) => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              });
            })
          );
        },
      });

      // Clean up blob URLs
      Array.from(images).forEach((img) => {
        if (img.src.startsWith("blob:")) {
          URL.revokeObjectURL(img.src);
        }
      });

      // Remove container
      document.body.removeChild(container);

      // Convert to PNG and create File
      const finalImage = canvas.toDataURL("image/png", 1.0);
      const blob = await (await fetch(finalImage)).blob();

      // Create and return File object
      const filename = `${nofa?.id?.substring(0, 3)}-${nofa?.coinId?.substring(
        0,
        3
      )}-${Date.now()}.png`;
      return new File([blob], filename, { type: "image/png" });
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  };

  const downloadNoFAPNG = async () => {
    setIsDownloading(true);
    toaster.create({
      description: "Creating PNG file ...",
      duration: 3000,
      type: "info",
    });

    const file = await createNoFAPNG();

    if (file) {
      toaster.create({
        description: "PNG file successfully created! Downloading ...",
        duration: 3000,
        type: "info",
      });
      const link = document.createElement("a");
      link.download = file.name;
      link.href = URL.createObjectURL(file);
      link.click();
      URL.revokeObjectURL(link.href);

      toaster.create({
        description: "Download success!",
        duration: 3000,
        type: "success",
      });
    } else {
      toaster.create({
        description: "PNG file creation unsuccessful. Try again later.",
        duration: 3000,
        type: "warning",
      });
    }

    setIsDownloading(false);
  };

  return (
    <>
      <Toaster />
      <Flex
        justifyContent="start"
        alignItems="left"
        flexDirection="column"
        minH="100vh"
        px={4}
      >
        <NoFAHeader
          onDownload={downloadNoFAPNG}
          isDownloading={isDownloading}
        />

        {!nofa?.ipfsURI && nofa?.creatorAuthId === user?.id ? (
          <Button
            bgColor="#A9CEEB"
            borderRadius={15}
            w="full"
            onClick={uploadToIPFS}
            disabled={isCreatingNFT}
            mb={4}
            alignSelf={"center"}
          >
            {isCreatingNFT ? (
              <Spinner size="sm" />
            ) : (
              <>
                <Text color="#0F1C33" fontSize="14px" fontWeight="medium">
                  Create an NFT with Nyla
                </Text>
                <LoveIcon />
              </>
            )}
          </Button>
        ) : null}

        <AgentStreamComponent
          privyWalletId={creator?.privyWalletId!}
        />

        <Flex
          bgColor="#E2E8F0"
          borderColor="#0F1C33"
          borderWidth="1px"
          direction="column"
          p={2}
          mb={8}
          ref={flexRef}
          width="100%"
          maxW="450px"
          overflow="visible"
          position="relative"
        >
          <CoinInfo
            coinImageURI={nofa?.coinImageURI!}
            id={nofa?.id!}
            coinId={nofa?.coinId}
          />
          <CoinPerspectiveSection coinId={nofa?.coinId!} />
          <TokenomicsSection
            marketCap={nofa?.marketCap!}
            totalSupply={nofa?.totalSupply!}
            circulatingSupply={nofa?.circulatingSupply!}
          />
          <HeadlineSection headlines={nofa?.headlines!} />
          <Footer timeCreated={nofa?.timeCreated!} />
        </Flex>
      </Flex>

      {isDownloading && (
        <Flex
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex={9999}
        >
          <Text color="white" fontSize="lg">
            Downloading ...
          </Text>
        </Flex>
      )}
    </>
  );
}
