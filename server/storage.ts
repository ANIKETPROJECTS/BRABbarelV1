import { db } from "./db";
import {
  categories,
  menuItems,
  type Category,
  type InsertCategory,
  type MenuItem,
  type InsertMenuItem,
  type CategoryWithItems
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<CategoryWithItems[]>;
  getCategory(id: number): Promise<CategoryWithItems | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<CategoryWithItems[]> {
    const cats = await db.select().from(categories);
    const results: CategoryWithItems[] = [];
    
    for (const cat of cats) {
      const items = await db.select().from(menuItems).where(eq(menuItems.categoryId, cat.id));
      results.push({ ...cat, items });
    }
    
    return results;
  }

  async getCategory(id: number): Promise<CategoryWithItems | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    if (!category) return undefined;
    
    const items = await db.select().from(menuItems).where(eq(menuItems.categoryId, id));
    return { ...category, items };
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  async seedData(): Promise<void> {
    const existing = await this.getCategories();
    if (existing.length > 0) return;

    // 1. Bomb Rolls
    const rollsCat = await this.createCategory({
      name: "Bomb Rolls",
      slug: "bomb-rolls",
      description: "Get ready for flavor explosions! The traditional Tikki Masala.",
      imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    });

    const rolls = [
      { name: "Chatpata Roll (Aloo)", price: 110, isVeg: true, description: "The spicy, tangy flavours enhanced from the best quality ingredients." },
      { name: "Chatpata Roll (Paneer)", price: 150, isVeg: true, description: "The spicy, tangy flavours enhanced from the best quality ingredients." },
      { name: "Chatpata Roll (Chicken)", price: 150, isVeg: false, description: "The spicy, tangy flavours enhanced from the best quality ingredients." },
      { name: "Angara Roll (Aloo)", price: 120, isVeg: true, description: "Explosion of spicy, tangy and vibrant flavours infused with warm spices." },
      { name: "Angara Roll (Paneer)", price: 160, isVeg: true, description: "Explosion of spicy, tangy and vibrant flavours infused with warm spices." },
      { name: "Angara Roll (Chicken)", price: 160, isVeg: false, description: "Explosion of spicy, tangy and vibrant flavours infused with warm spices." },
      { name: "Haryali Roll (Aloo)", price: 120, isVeg: true, description: "Bursting with Chilli and cooling flavour notes of mint and coriander." },
      { name: "Haryali Roll (Paneer)", price: 160, isVeg: true, description: "Bursting with Chilli and cooling flavour notes of mint and coriander." },
      { name: "Haryali Roll (Chicken)", price: 160, isVeg: false, description: "Bursting with Chilli and cooling flavour notes of mint and coriander." },
      { name: "Makhmali Roll (Aloo)", price: 130, isVeg: true, description: "A blast of rich and creamy flavours with a harmonious balance." },
      { name: "Makhmali Roll (Paneer)", price: 170, isVeg: true, description: "A blast of rich and creamy flavours with a harmonious balance." },
      { name: "Makhmali Roll (Chicken)", price: 170, isVeg: false, description: "A blast of rich and creamy flavours with a harmonious balance." },
    ];

    for (const item of rolls) {
      await this.createMenuItem({ ...item, categoryId: rollsCat.id });
    }

    // 2. Bomb Bowls
    const bowlsCat = await this.createCategory({
      name: "Bomb Bowls",
      slug: "bomb-bowls",
      description: "Embark on a culinary journey with our enticing Rice Bowls.",
      imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    });

    const bowls = [
      { name: "Tikka Rice Bowl (Paneer)", price: 160, isVeg: true },
      { name: "Tikka Rice Bowl (Chicken)", price: 160, isVeg: false },
      { name: "Achari Tikka Rice Bowl (Paneer)", price: 170, isVeg: true },
      { name: "Achari Tikka Rice Bowl (Chicken)", price: 170, isVeg: false },
      { name: "Pahadi Tikka Rice Bowl (Paneer)", price: 170, isVeg: true },
      { name: "Pahadi Tikka Rice Bowl (Chicken)", price: 170, isVeg: false },
      { name: "Malai Tikka Rice Bowl (Paneer)", price: 180, isVeg: true },
      { name: "Malai Tikka Rice Bowl (Chicken)", price: 180, isVeg: false },
    ];

    for (const item of bowls) {
      await this.createMenuItem({ ...item, categoryId: bowlsCat.id });
    }

    // 3. Bomb Salads
    const saladsCat = await this.createCategory({
      name: "Bomb Salads",
      slug: "bomb-salads",
      description: "A healthier take on our flavour-full rolls.",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    });

    const salads = [
      { name: "Chatpata Salad (Paneer)", price: 150, isVeg: true },
      { name: "Chatpata Salad (Chicken)", price: 150, isVeg: false },
      { name: "Angara Salad (Paneer)", price: 160, isVeg: true },
      { name: "Angara Salad (Chicken)", price: 160, isVeg: false },
      { name: "Haryali Salad (Paneer)", price: 160, isVeg: true },
      { name: "Haryali Salad (Chicken)", price: 160, isVeg: false },
      { name: "Makhmali Salad (Paneer)", price: 170, isVeg: true },
      { name: "Makhmali Salad (Chicken)", price: 170, isVeg: false },
    ];

    for (const item of salads) {
      await this.createMenuItem({ ...item, categoryId: saladsCat.id });
    }

    // 4. Bomb Panini
    const paniniCat = await this.createCategory({
      name: "Bomb Panini",
      slug: "bomb-panini",
      description: "Crunchy, cheesy, and exploding with flavor.",
      imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    });

    const panini = [
      { name: "Tikka Panini (Aloo)", price: 150, isVeg: true },
      { name: "Tikka Panini (Paneer)", price: 170, isVeg: true },
      { name: "Tikka Panini (Chicken)", price: 170, isVeg: false },
      { name: "Achari Tikka Panini (Aloo)", price: 160, isVeg: true },
      { name: "Achari Tikka Panini (Paneer)", price: 180, isVeg: true },
      { name: "Achari Tikka Panini (Chicken)", price: 180, isVeg: false },
      { name: "Pahadi Tikka Panini (Aloo)", price: 160, isVeg: true },
      { name: "Pahadi Tikka Panini (Paneer)", price: 180, isVeg: true },
      { name: "Pahadi Tikka Panini (Chicken)", price: 180, isVeg: false },
      { name: "Malai Tikka Panini (Aloo)", price: 170, isVeg: true },
      { name: "Malai Tikka Panini (Paneer)", price: 190, isVeg: true },
      { name: "Malai Tikka Panini (Chicken)", price: 190, isVeg: false },
    ];

    for (const item of panini) {
      await this.createMenuItem({ ...item, categoryId: paniniCat.id });
    }
  }
}

export const storage = new DatabaseStorage();
