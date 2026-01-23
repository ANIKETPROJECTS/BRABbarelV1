import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromoCarousel } from "@/components/PromoCarousel";
import { CategorySection } from "@/components/CategorySection";
import { useCategories } from "@/hooks/use-menu";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Home() {
  const { data: categories, isLoading, error } = useCategories();
  const [isVegOnly, setIsVegOnly] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="font-display text-xl animate-pulse text-primary">Loading Flavor Bombs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="text-6xl mb-4">💣</div>
        <h2 className="font-display text-3xl font-bold text-primary mb-2">System Failure</h2>
        <p className="text-muted-foreground">Failed to load the menu. Please refresh to reboot.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-secondary font-display font-bold border-2 border-black rounded-lg shadow-pop hover:shadow-pop-hover transition-all"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PromoCarousel />

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Controls Bar */}
          <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-2 border-black rounded-xl p-4 mb-8 shadow-pop-sm flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Menu Categories</h2>
            
            <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg border border-gray-200">
              <Label htmlFor="veg-mode" className={`font-bold cursor-pointer transition-colors ${isVegOnly ? 'text-muted-foreground' : 'text-red-600'}`}>
                ALL
              </Label>
              <Switch 
                id="veg-mode"
                checked={isVegOnly}
                onCheckedChange={setIsVegOnly}
                className="data-[state=checked]:bg-green-500"
              />
              <Label htmlFor="veg-mode" className={`font-bold cursor-pointer transition-colors ${isVegOnly ? 'text-green-600' : 'text-muted-foreground'}`}>
                VEG
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            {categories?.map((category) => (
              <CategorySection 
                key={category.id} 
                category={category} 
                isVegOnly={isVegOnly}
              />
            ))}
          </div>

          {!categories?.length && (
            <div className="text-center py-20 opacity-50">
              <p className="font-display text-2xl">No items found.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
