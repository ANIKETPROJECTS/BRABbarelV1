import type { MenuItem } from "@shared/routes";
import { Plus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="group bg-white rounded-xl border-2 border-black p-4 shadow-pop-sm hover:shadow-pop transition-all duration-200 flex gap-4 h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full border-2 border-black shrink-0 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
            <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors">
              {item.name}
            </h3>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-lg">₹{item.price}</span>
          <button 
            className="w-8 h-8 flex items-center justify-center bg-secondary rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_black] hover:bg-secondary/80 active:translate-y-1 active:shadow-none transition-all"
            aria-label="Add to cart"
            onClick={() => {/* TODO: Add to cart logic */}}
          >
            <Plus className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
      
      {item.imageUrl && (
        <div className="w-24 h-24 shrink-0 rounded-lg border-2 border-black overflow-hidden relative shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
    </div>
  );
}
