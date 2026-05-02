import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/not-found";
import { Splash } from "@/components/Splash";
import { SplashProvider, useSplash } from "@/context/SplashContext";

function MenuRouter() {
  const { showSplash, setShowSplash } = useSplash();
  return (
    <>
      <AnimatePresence>
        {showSplash && <Splash onEnter={() => setShowSplash(false)} />}
      </AnimatePresence>
      <div className={showSplash ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
        <Home />
      </div>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/menu">
        <SplashProvider>
          <MenuRouter />
        </SplashProvider>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
