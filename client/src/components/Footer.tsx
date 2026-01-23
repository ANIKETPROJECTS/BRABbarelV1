import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white border-t-4 border-black relative overflow-hidden mt-12">
      {/* Checkered Divider */}
      <div className="w-full h-4 bg-checkered absolute top-0 left-0" />
      
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Brand */}
          <div className="text-center md:text-left space-y-4">
            <h2 className="font-display text-4xl drop-shadow-[2px_2px_0px_black]">BOMB ROLLS</h2>
            <p className="text-white/90 max-w-xs mx-auto md:mx-0">
              Flavor bombs delivered straight to your taste buds. Experience the explosion!
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-display text-2xl mb-4 drop-shadow-[1px_1px_0px_black]">Quick Bites</h3>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-secondary hover:underline transition-all">Menu</a></li>
              <li><a href="#" className="hover:text-secondary hover:underline transition-all">Locations</a></li>
              <li><a href="#" className="hover:text-secondary hover:underline transition-all">Franchise</a></li>
              <li><a href="#" className="hover:text-secondary hover:underline transition-all">Careers</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="text-center md:text-right space-y-4">
            <h3 className="font-display text-2xl mb-4 drop-shadow-[1px_1px_0px_black]">Contact Base</h3>
            <div className="flex flex-col items-center md:items-end gap-3 font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-secondary" />
                <span>123 Flavor Street, Food City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-secondary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-secondary" />
                <span>hello@bombrolls.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm opacity-80">
          © 2024 Bomb Rolls & Bowls. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a 
      href="#" 
      className="p-2 bg-white text-primary rounded-lg border-2 border-black shadow-[2px_2px_0px_black] hover:-translate-y-1 hover:shadow-[3px_3px_0px_black] transition-all"
    >
      {icon}
    </a>
  );
}
