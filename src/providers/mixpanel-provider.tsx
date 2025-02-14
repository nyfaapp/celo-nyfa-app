"use client";
import { useEffect, createContext } from "react";
import { initMixpanel } from "@/config/mixpanel";
import mixpanel from "mixpanel-browser";

// Define the shape of the context value
interface MixpanelContextType {
  trackMixpanelEvent: (eventName: string, eventProperties: {}) => void;
  identifyUser: (userId: string, userDetails: {}) => void;
}

export const MixpanelContext = createContext<MixpanelContextType | undefined>(
  undefined // Initially set to undefined to ensure proper error handling
);

const MixpanelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    initMixpanel();
  }, []);

  const trackMixpanelEvent = (eventName: string, eventProperties: {}) => {
    mixpanel.track(eventName, eventProperties);
  };

  const identifyUser = (userId: string, userDetails: {}) => {
    mixpanel.people.set(userId, userDetails);
  };

  const value: MixpanelContextType = { trackMixpanelEvent, identifyUser };

  return (
    <MixpanelContext.Provider value={value}>
      {children}
    </MixpanelContext.Provider>
  );
};

export default MixpanelContextProvider;
