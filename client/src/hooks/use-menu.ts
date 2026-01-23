import { useQuery } from "@tanstack/react-query";
import { staticMenuData } from "@/lib/staticData";
import { type CategoryWithItems } from "@shared/schema";

export function useCategories() {
  return useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return staticMenuData as CategoryWithItems[];
    },
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: ["/api/categories", id],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const category = staticMenuData.find(c => c.id === id);
      return (category || null) as CategoryWithItems | null;
    },
    enabled: !!id,
  });
}
