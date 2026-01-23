import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

const PROMOS = [
  {
    id: 1,
    title: "Signature Bomb Rolls",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
    color: "bg-orange-100",
  },
  {
    id: 2,
    title: "Fresh Bowls",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
    color: "bg-green-100",
  },
  {
    id: 3,
    title: "Spicy Detonators",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=60",
    color: "bg-red-100",
  },
];

export function PromoCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3500 })]);

  return (
    <div className="overflow-hidden border-b-4 border-black" ref={emblaRef}>
      <div className="flex">
        {PROMOS.map((promo) => (
          <div key={promo.id} className="flex-[0_0_100%] min-w-0 relative h-64 md:h-80 group cursor-pointer">
            {/* Image Background */}
            <div className="absolute inset-0">
              {/* Unsplash Food Images */}
              <img 
                src={promo.image} 
                alt={promo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <span className="inline-block px-4 py-1 mb-4 bg-secondary text-black font-bold text-sm tracking-widest uppercase rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                Featured
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-white drop-shadow-[4px_4px_0px_black] transform group-hover:scale-110 transition-transform duration-300">
                {promo.title}
              </h2>
            </div>
            
            {/* Checkered Overlay at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-checkered opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
