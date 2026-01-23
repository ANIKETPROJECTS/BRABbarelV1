import { Menu } from "lucide-react";
import { Link } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logoImage from "@assets/logo_(1)_1769147400424.png";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full shadow-lg">
      <div className="bg-primary px-4 py-3 flex items-center justify-between border-b-4 border-black relative overflow-hidden">
        {/* Checkered decoration line at the very top edge */}
        <div className="absolute top-0 left-0 w-full h-1 bg-checkered-sm opacity-50" />

        <Link href="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-90 transition-opacity">
          <img 
            src={logoImage} 
            alt="Bomb Rolls & Bowls Logo" 
            className="w-12 h-12 object-contain"
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="w-8 h-8" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-secondary border-l-4 border-black p-0 w-3/4 sm:w-80">
            <div className="h-full flex flex-col">
              <div className="h-16 bg-checkered border-b-4 border-black" />
              <nav className="flex-1 p-6 space-y-4 font-display text-2xl">
                <Link href="/" className="block py-2 text-black hover:text-primary transition-colors hover:translate-x-2">
                  Menu
                </Link>
                <Link href="/about" className="block py-2 text-black hover:text-primary transition-colors hover:translate-x-2">
                  Our Story
                </Link>
                <Link href="/locations" className="block py-2 text-black hover:text-primary transition-colors hover:translate-x-2">
                  Locations
                </Link>
              </nav>
              <div className="p-6 bg-primary text-white border-t-4 border-black text-center">
                <p className="font-display text-lg">Bomb Rolls & Bowls</p>
                <p className="text-sm opacity-80 font-body mt-1">Est. 2024</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Decorative bottom edge */}
      <div className="h-2 w-full bg-checkered-sm border-b-2 border-black" />
    </header>
  );
}
