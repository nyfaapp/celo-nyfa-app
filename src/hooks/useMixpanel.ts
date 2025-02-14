import { useContext } from 'react';
import { MixpanelContext } from '@/providers/mixpanel-provider';

const useMixpanel = () => {
  const context = useContext(MixpanelContext);
  
  if (!context) {
    throw new Error(
      'useAmplitudeContext must be used within an AmplitudeContextProvider'
    );
  }

  return context;
};

export default useMixpanel;
