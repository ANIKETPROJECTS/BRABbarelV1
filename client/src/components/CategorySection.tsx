import type { CategoryWithItems } from "@shared/routes";
import { MenuItemCard } from "./MenuItemCard";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

interface CategorySectionProps {
  category: CategoryWithItems;
  isVegOnly: boolean;
}

export function CategorySection({ category, isVegOnly }: CategorySectionProps) {
  const filteredItems = category.items.filter(item => !isVegOnly || item.isVeg);

  if (filteredItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <Accordion type="single" collapsible defaultValue={`cat-${category.id}`} className="w-full">
        <AccordionItem value={`cat-${category.id}`} className="border-none">
          <AccordionTrigger className="hover:no-underline group">
            <div className="w-full bg-secondary border-2 border-black rounded-xl p-4 shadow-pop-sm group-data-[state=open]:shadow-pop transition-all flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-4 z-10">
                {category.imageUrl && (
                  <img 
                    src={category.imageUrl} 
                    alt="" 
                    className="w-12 h-12 rounded-full border-2 border-black object-cover bg-white"
                  />
                )}
                <div className="text-left">
                  <h2 className="text-2xl font-display font-bold text-black group-hover:scale-105 transition-transform origin-left">
                    {category.name}
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                    {filteredItems.length} items
                  </p>
                </div>
              </div>
              
              {/* Background pattern decoration */}
              <div className="absolute right-0 top-0 h-full w-24 bg-checkered opacity-10 -skew-x-12" />
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="pt-4 px-1 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
