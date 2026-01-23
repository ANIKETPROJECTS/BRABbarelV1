import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { Splash } from "@/components/Splash";
import { SplashProvider, useSplash } from "@/context/SplashContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { showSplash, setShowSplash } = useSplash();

  return (
    <>
      <AnimatePresence>
        {showSplash && <Splash onEnter={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      <div className={showSplash ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 transition-opacity duration-1000'}>
        <Router />
      </div>
      
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SplashProvider>
          <AppContent />
        </SplashProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
