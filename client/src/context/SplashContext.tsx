import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface SplashContextType {
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function SplashProvider({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSplash]);

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
}
