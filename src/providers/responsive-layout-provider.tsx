import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Spinner } from "@heroui/spinner";

// Configuration options for the layout
interface ResponsiveLayoutConfig {
  maxMobileWidth: number;
  maxContentWidth: number;
  mobileBackgroundColor?: string;
  desktopBackgroundColor?: string;
  showMobileBorder?: boolean;
}

// Default configuration
const defaultConfig: ResponsiveLayoutConfig = {
  maxMobileWidth: 480,
  maxContentWidth: 480,
  mobileBackgroundColor: "transparent",
  desktopBackgroundColor: "#f5f5f5",
  showMobileBorder: true,
};

interface ResponsiveLayoutProviderProps {
  children: React.ReactNode;
  config?: Partial<ResponsiveLayoutConfig>;
}

const ResponsiveLayoutProvider: React.FC<ResponsiveLayoutProviderProps> = ({
  children,
  config = {},
}) => {
  // Merge default config with user provided config
  const fullConfig = { ...defaultConfig, ...config };

  // State to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash
  const [mounted, setMounted] = useState(false);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= fullConfig.maxMobileWidth);
    };

    // Set initial value
    checkIfMobile();

    // Mark as mounted
    setMounted(true);

    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [fullConfig.maxMobileWidth]);

  // Don't render anything until after initial mount
  if (!mounted)
    return (
      <Flex
        // ref={flexRef}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"100vh"}
      >
        <Spinner size="sm" />
      </Flex>
    );

  if (isMobile) {
    // On mobile, render normally with full width
    return <>{children}</>;
  }

  // On desktop, center the content and limit the width
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      bg={fullConfig.desktopBackgroundColor}
    >
      <Box
        width="100%"
        maxWidth={`${fullConfig.maxContentWidth}px`}
        height="100%"
        overflowY="auto"
        bg="white"
        position="relative"
      >
        {children}
      </Box>
    </Box>
  );
};

export default ResponsiveLayoutProvider;
export { ResponsiveLayoutProvider };
