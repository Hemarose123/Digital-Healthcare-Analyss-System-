import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Flame, Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import DietOverview from "../components/DietOverview";
import {
  useAddDietFavorite,
  useDietFavorites,
  useRemoveDietFavorite,
} from "../hooks/useBackend";
import { useHealthStore } from "../store/useHealthStore";
import type { HealthGoal, Lifestyle } from "../types/health";

// ─── Meal Database ────────────────────────────────────────────────────────────
interface MealNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface MealRecipe {
  ingredients: string[];
  steps: string[];
}

interface Meal {
  id: string;
  name: string;
  emoji: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snacks";
  cuisine: string;
  nutrition: MealNutrition;
  tags: string[];
  prepTime: number;
  recipe: MealRecipe;
  goals: HealthGoal[];
}

const MEALS: Meal[] = [
  // BREAKFAST
  {
    id: "b1",
    name: "Greek Yogurt Parfait with Berries",
    emoji: "🍓",
    mealType: "breakfast",
    cuisine: "Mediterranean",
    nutrition: { calories: 280, protein: 18, carbs: 34, fat: 6, fiber: 4 },
    tags: ["vegetarian", "high-protein", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "nutrition", "mental_wellness"],
    recipe: {
      ingredients: [
        "1 cup Greek yogurt",
        "1/2 cup mixed berries",
        "2 tbsp granola",
        "1 tsp honey",
        "Mint leaves",
      ],
      steps: [
        "Add Greek yogurt to a bowl",
        "Layer with mixed berries",
        "Sprinkle granola on top",
        "Drizzle honey",
        "Garnish with mint",
      ],
    },
  },
  {
    id: "b2",
    name: "Oatmeal with Banana & Peanut Butter",
    emoji: "🥣",
    mealType: "breakfast",
    cuisine: "American",
    nutrition: { calories: 420, protein: 14, carbs: 68, fat: 10, fiber: 8 },
    tags: ["vegan", "high-protein", "energy"],
    prepTime: 10,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup rolled oats",
        "2 cups oat milk",
        "1 banana",
        "2 tbsp peanut butter",
        "1 tsp cinnamon",
      ],
      steps: [
        "Cook oats in milk over medium heat",
        "Stir in cinnamon",
        "Pour into bowl",
        "Slice banana on top",
        "Drizzle peanut butter",
      ],
    },
  },
  {
    id: "b3",
    name: "Avocado Toast with Poached Eggs",
    emoji: "🥑",
    mealType: "breakfast",
    cuisine: "Fusion",
    nutrition: { calories: 380, protein: 16, carbs: 30, fat: 22, fiber: 3 },
    tags: ["vegetarian", "high-protein"],
    prepTime: 15,
    goals: ["mental_wellness", "nutrition"],
    recipe: {
      ingredients: [
        "2 slices whole grain bread",
        "1 ripe avocado",
        "2 eggs",
        "Red chili flakes",
        "Lemon juice",
        "Sea salt",
      ],
      steps: [
        "Toast bread to golden brown",
        "Mash avocado with lemon juice and salt",
        "Poach eggs for 3-4 minutes",
        "Spread avocado on toast",
        "Top with eggs and chili flakes",
      ],
    },
  },
  {
    id: "b4",
    name: "Smoothie Bowl",
    emoji: "🫐",
    mealType: "breakfast",
    cuisine: "Tropical",
    nutrition: { calories: 320, protein: 8, carbs: 60, fat: 5, fiber: 7 },
    tags: ["vegan", "quick", "low-cal"],
    prepTime: 10,
    goals: ["weight_loss", "mental_wellness"],
    recipe: {
      ingredients: [
        "1 frozen banana",
        "1/2 cup frozen blueberries",
        "1/4 cup almond milk",
        "Toppings: granola, seeds, fresh fruit",
      ],
      steps: [
        "Blend frozen banana and blueberries with almond milk",
        "Pour into bowl — it should be thick",
        "Add toppings of your choice",
        "Eat immediately",
      ],
    },
  },
  // LUNCH
  {
    id: "l1",
    name: "Quinoa Power Bowl",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Fusion",
    nutrition: { calories: 480, protein: 24, carbs: 62, fat: 14, fiber: 7 },
    tags: ["vegan", "high-protein"],
    prepTime: 25,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup cooked quinoa",
        "1/2 cup black beans",
        "1 cup roasted vegetables",
        "2 tbsp tahini dressing",
        "Avocado slices",
      ],
      steps: [
        "Cook quinoa as per instructions",
        "Roast vegetables at 200°C for 20 min",
        "Assemble bowl with quinoa base",
        "Add beans and vegetables",
        "Drizzle tahini and top with avocado",
      ],
    },
  },
  {
    id: "l2",
    name: "Grilled Chicken Salad",
    emoji: "🍗",
    mealType: "lunch",
    cuisine: "Mediterranean",
    nutrition: { calories: 340, protein: 38, carbs: 12, fat: 16, fiber: 3 },
    tags: ["high-protein", "low-cal"],
    prepTime: 20,
    goals: ["weight_loss", "fitness"],
    recipe: {
      ingredients: [
        "150g chicken breast",
        "Mixed greens",
        "Cherry tomatoes",
        "Cucumber",
        "Olive oil & lemon dressing",
      ],
      steps: [
        "Season and grill chicken for 6 min per side",
        "Slice and rest for 5 minutes",
        "Toss greens with dressing",
        "Add chicken, tomatoes, cucumber",
        "Serve immediately",
      ],
    },
  },
  {
    id: "l3",
    name: "Lentil Soup with Rye Bread",
    emoji: "🍲",
    mealType: "lunch",
    cuisine: "Middle Eastern",
    nutrition: { calories: 380, protein: 18, carbs: 55, fat: 8, fiber: 6 },
    tags: ["vegan", "quick"],
    prepTime: 30,
    goals: ["disease_prevention", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup red lentils",
        "1 onion",
        "2 garlic cloves",
        "Cumin, turmeric",
        "Vegetable broth",
        "Spinach",
      ],
      steps: [
        "Sauté onion and garlic",
        "Add lentils and spices",
        "Pour in broth and simmer 20 min",
        "Add spinach at the end",
        "Serve with rye bread",
      ],
    },
  },
  {
    id: "l4",
    name: "Salmon Poke Bowl",
    emoji: "🐟",
    mealType: "lunch",
    cuisine: "Japanese",
    nutrition: { calories: 510, protein: 32, carbs: 48, fat: 18, fiber: 6 },
    tags: ["high-protein"],
    prepTime: 15,
    goals: ["mental_wellness", "fitness"],
    recipe: {
      ingredients: [
        "150g sushi-grade salmon",
        "Brown rice",
        "Edamame",
        "Avocado",
        "Soy sauce & sesame oil",
      ],
      steps: [
        "Cook brown rice",
        "Cube salmon and marinate in soy sauce",
        "Arrange rice in bowl",
        "Add salmon, edamame, avocado",
        "Drizzle with sesame oil",
      ],
    },
  },
  // DINNER
  {
    id: "d1",
    name: "Baked Salmon with Sweet Potato",
    emoji: "🐠",
    mealType: "dinner",
    cuisine: "American",
    nutrition: { calories: 520, protein: 38, carbs: 40, fat: 20, fiber: 5 },
    tags: ["high-protein"],
    prepTime: 35,
    goals: ["fitness", "mental_wellness"],
    recipe: {
      ingredients: [
        "200g salmon fillet",
        "1 medium sweet potato",
        "Broccoli florets",
        "Olive oil",
        "Garlic and lemon",
      ],
      steps: [
        "Preheat oven to 200°C",
        "Cube sweet potato and toss with oil",
        "Place salmon and vegetables on tray",
        "Bake for 20-25 minutes",
        "Squeeze lemon before serving",
      ],
    },
  },
  {
    id: "d2",
    name: "Chickpea Curry with Brown Rice",
    emoji: "🍛",
    mealType: "dinner",
    cuisine: "Indian",
    nutrition: { calories: 460, protein: 16, carbs: 72, fat: 12, fiber: 9 },
    tags: ["vegan", "vegetarian"],
    prepTime: 30,
    goals: ["disease_prevention", "weight_loss"],
    recipe: {
      ingredients: [
        "1 can chickpeas",
        "1 cup brown rice",
        "Coconut milk",
        "Tomatoes, onion, garlic",
        "Garam masala, turmeric, cumin",
      ],
      steps: [
        "Cook brown rice separately",
        "Sauté onion and garlic",
        "Add spices and tomatoes",
        "Add chickpeas and coconut milk",
        "Simmer 15 min and serve over rice",
      ],
    },
  },
  {
    id: "d3",
    name: "Stir-Fried Tofu & Vegetables",
    emoji: "🥦",
    mealType: "dinner",
    cuisine: "Asian",
    nutrition: { calories: 360, protein: 20, carbs: 32, fat: 16, fiber: 4 },
    tags: ["vegan", "high-protein", "quick", "low-cal"],
    prepTime: 20,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "200g firm tofu",
        "Mixed vegetables (bell pepper, broccoli, carrot)",
        "Soy sauce, ginger, garlic",
        "Sesame oil",
        "Brown rice or noodles",
      ],
      steps: [
        "Press and cube tofu, pan-fry until golden",
        "Stir-fry vegetables in sesame oil",
        "Add garlic, ginger, soy sauce",
        "Combine tofu and vegetables",
        "Serve over rice or noodles",
      ],
    },
  },
  {
    id: "d4",
    name: "Turkey Meatballs with Zucchini Noodles",
    emoji: "🍝",
    mealType: "dinner",
    cuisine: "Italian",
    nutrition: { calories: 430, protein: 42, carbs: 18, fat: 22, fiber: 3 },
    tags: ["high-protein", "low-cal"],
    prepTime: 30,
    goals: ["weight_loss", "fitness"],
    recipe: {
      ingredients: [
        "300g ground turkey",
        "2 zucchinis (spiralized)",
        "Marinara sauce",
        "Egg, breadcrumbs, herbs",
        "Parmesan",
      ],
      steps: [
        "Mix turkey with egg, breadcrumbs, herbs",
        "Roll into balls and bake 20 min",
        "Spiralize zucchinis",
        "Warm marinara sauce",
        "Serve meatballs over zucchini noodles",
      ],
    },
  },
  // SNACKS
  {
    id: "s1",
    name: "Almond Butter Energy Balls",
    emoji: "🌰",
    mealType: "snacks",
    cuisine: "American",
    nutrition: { calories: 180, protein: 6, carbs: 22, fat: 8, fiber: 3 },
    tags: ["vegan", "quick", "high-protein"],
    prepTime: 15,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup oats",
        "3 tbsp almond butter",
        "2 tbsp honey",
        "1/4 cup dark chocolate chips",
        "1 tbsp chia seeds",
      ],
      steps: [
        "Mix all ingredients in a bowl",
        "Refrigerate for 30 minutes",
        "Roll into 12 balls",
        "Store in fridge for up to 1 week",
      ],
    },
  },
  {
    id: "s2",
    name: "Hummus with Rainbow Veggies",
    emoji: "🥕",
    mealType: "snacks",
    cuisine: "Mediterranean",
    nutrition: { calories: 160, protein: 6, carbs: 18, fat: 8, fiber: 3 },
    tags: ["vegan", "vegetarian", "low-cal", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "disease_prevention"],
    recipe: {
      ingredients: [
        "1/2 cup hummus",
        "Carrot sticks",
        "Cucumber slices",
        "Bell pepper strips",
        "Celery sticks",
      ],
      steps: [
        "Wash and cut vegetables",
        "Place hummus in center of plate",
        "Arrange vegetables around hummus",
        "Serve chilled",
      ],
    },
  },
  {
    id: "s3",
    name: "Mixed Nuts & Dark Chocolate",
    emoji: "🍫",
    mealType: "snacks",
    cuisine: "Universal",
    nutrition: { calories: 220, protein: 5, carbs: 16, fat: 16, fiber: 3 },
    tags: ["quick", "vegan"],
    prepTime: 2,
    goals: ["mental_wellness", "disease_prevention"],
    recipe: {
      ingredients: [
        "1/4 cup mixed nuts (almonds, walnuts, cashews)",
        "1 oz dark chocolate (70%+)",
        "Optional: dried cranberries",
      ],
      steps: [
        "Portion nuts into small bowl",
        "Break chocolate into pieces",
        "Mix together",
        "Enjoy mindfully",
      ],
    },
  },
  {
    id: "s4",
    name: "Green Smoothie",
    emoji: "🥬",
    mealType: "snacks",
    cuisine: "Wellness",
    nutrition: { calories: 140, protein: 4, carbs: 26, fat: 3, fiber: 3 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup spinach",
        "1 banana",
        "1/2 cup cucumber",
        "1 cup coconut water",
        "Ginger slice",
      ],
      steps: [
        "Add all ingredients to blender",
        "Blend until smooth",
        "Pour over ice",
        "Drink immediately",
      ],
    },
  },
  // NEW PCOS & WEIGHT LOSS FOCUSED MEALS
  {
    id: "b5",
    name: "Spinach & Mushroom Omelet",
    emoji: "🍳",
    mealType: "breakfast",
    cuisine: "French",
    nutrition: { calories: 240, protein: 18, carbs: 4, fat: 16, fiber: 2 },
    tags: ["vegetarian", "high-protein", "low-cal"],
    prepTime: 12,
    goals: ["pcos", "weight_loss", "hormonal_health"],
    recipe: {
      ingredients: [
        "2 large eggs",
        "1 cup baby spinach",
        "1/2 cup sliced mushrooms",
        "1 tsp olive oil",
        "Salt & pepper",
      ],
      steps: [
        "Sauté mushrooms and spinach in olive oil",
        "Beat eggs and pour over vegetables",
        "Cook until set, fold and serve",
      ],
    },
  },
  {
    id: "b6",
    name: "Chia Seed Pudding with Almonds",
    emoji: "🍮",
    mealType: "breakfast",
    cuisine: "Modern",
    nutrition: { calories: 290, protein: 9, carbs: 22, fat: 18, fiber: 11 },
    tags: ["vegan", "quick", "low-cal"],
    prepTime: 5,
    goals: ["pcos", "hormonal_health", "nutrition"],
    recipe: {
      ingredients: [
        "3 tbsp chia seeds",
        "1 cup unsweetened almond milk",
        "1/2 tsp vanilla extract",
        "10 crushed almonds",
        "Berries for topping",
      ],
      steps: [
        "Mix chia seeds, milk, and vanilla",
        "Let sit overnight or for 4 hours",
        "Top with almonds and berries",
      ],
    },
  },
  {
    id: "l5",
    name: "Mediterranean Chickpea Salad",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Mediterranean",
    nutrition: { calories: 340, protein: 12, carbs: 45, fat: 14, fiber: 12 },
    tags: ["vegan", "vegetarian", "quick"],
    prepTime: 10,
    goals: ["pcos", "weight_loss", "disease_prevention"],
    recipe: {
      ingredients: [
        "1 can chickpeas (rinsed)",
        "1 cucumber (diced)",
        "1 cup cherry tomatoes",
        "1/4 red onion",
        "Lemon-tahini dressing",
      ],
      steps: [
        "Combine all vegetables and chickpeas",
        "Toss with dressing",
        "Garnish with parsley",
      ],
    },
  },
  {
    id: "l6",
    name: "Grilled Salmon with Quinoa & Kale",
    emoji: "🍣",
    mealType: "lunch",
    cuisine: "Healthy",
    nutrition: { calories: 450, protein: 34, carbs: 28, fat: 22, fiber: 6 },
    tags: ["high-protein", "low-cal"],
    prepTime: 25,
    goals: ["pcos", "hormonal_health", "fitness"],
    recipe: {
      ingredients: [
        "150g Salmon fillet",
        "1/2 cup cooked quinoa",
        "2 cups massaged kale",
        "Lemon & garlic",
      ],
      steps: [
        "Grill salmon for 12 minutes",
        "Mix quinoa with kale",
        "Serve salmon over the grain bed",
      ],
    },
  },
  {
    id: "d5",
    name: "Lentil Dal with Steamed Cauliflower",
    emoji: "🥘",
    mealType: "dinner",
    cuisine: "Indian",
    nutrition: { calories: 310, protein: 18, carbs: 42, fat: 6, fiber: 14 },
    tags: ["vegan", "vegetarian", "low-cal"],
    prepTime: 30,
    goals: ["pcos", "weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup red lentils",
        "1 onion",
        "Ginger-garlic paste",
        "Turmeric, Cumin",
        "1 head cauliflower",
      ],
      steps: [
        "Cook lentils with spices until soft",
        "Steam cauliflower florets",
        "Serve dal over cauliflower 'rice' or florets",
      ],
    },
  },
  {
    id: "d6",
    name: "Lemon Herb Baked Cod",
    emoji: "🐟",
    mealType: "dinner",
    cuisine: "Coastal",
    nutrition: { calories: 280, protein: 32, carbs: 8, fat: 12, fiber: 4 },
    tags: ["high-protein", "low-cal", "quick"],
    prepTime: 20,
    goals: ["pcos", "weight_loss", "hormonal_health"],
    recipe: {
      ingredients: [
        "200g Cod fillet",
        "Bunch of asparagus",
        "Fresh dill & parsley",
        "Lemon slices",
        "Olive oil",
      ],
      steps: [
        "Place cod and asparagus on a baking sheet",
        "Season with herbs and lemon",
        "Bake at 200°C for 15 minutes",
      ],
    },
  },
  {
    id: "s5",
    name: "Apple Slices with Cinnamon & Nut Butter",
    emoji: "🍏",
    mealType: "snacks",
    cuisine: "Simple",
    nutrition: { calories: 190, protein: 4, carbs: 25, fat: 9, fiber: 5 },
    tags: ["vegan", "quick"],
    prepTime: 3,
    goals: ["pcos", "weight_loss"],
    recipe: {
      ingredients: [
        "1 medium apple",
        "1 tbsp almond butter",
        "Pinch of cinnamon",
      ],
      steps: [
        "Slice the apple",
        "Spread almond butter on slices",
        "Dust with cinnamon",
      ],
    },
  },
  {
    id: "s6",
    name: "Roasted Chickpeas (Spicy)",
    emoji: "🍿",
    mealType: "snacks",
    cuisine: "Modern",
    nutrition: { calories: 150, protein: 7, carbs: 20, fat: 5, fiber: 6 },
    tags: ["vegan", "high-protein"],
    prepTime: 30,
    goals: ["pcos", "weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "1 can chickpeas",
        "1 tsp olive oil",
        "Paprika, Cumin, Cayenne",
      ],
      steps: [
        "Dry chickpeas thoroughly",
        "Toss with oil and spices",
        "Roast at 200°C for 25 mins until crunchy",
      ],
    },
  },
  {
    id: "b7",
    name: "Quinoa Breakfast Bowl",
    emoji: "🥣",
    mealType: "breakfast",
    cuisine: "Modern",
    nutrition: { calories: 310, protein: 12, carbs: 48, fat: 8, fiber: 9 },
    tags: ["vegan", "high-protein"],
    prepTime: 20,
    goals: ["nutrition", "fitness"],
    recipe: {
      ingredients: [
        "1/2 cup quinoa",
        "1 cup almond milk",
        "Blueberries",
        "Walnuts",
        "Cinnamon",
      ],
      steps: [
        "Cook quinoa in almond milk",
        "Stir in cinnamon",
        "Top with blueberries and walnuts",
      ],
    },
  },
  {
    id: "b8",
    name: "Scrambled Tofu with Turmeric",
    emoji: "🍳",
    mealType: "breakfast",
    cuisine: "Asian-Fusion",
    nutrition: { calories: 220, protein: 16, carbs: 8, fat: 12, fiber: 4 },
    tags: ["vegan", "high-protein", "low-cal"],
    prepTime: 10,
    goals: ["pcos", "hormonal_health", "nutrition"],
    recipe: {
      ingredients: [
        "Firm tofu",
        "Turmeric",
        "Nutritional yeast",
        "Spinach",
        "Bell peppers",
      ],
      steps: [
        "Crumble tofu into a pan",
        "Add spices and chopped peppers",
        "Sauté until heated, add spinach at the end",
      ],
    },
  },
  {
    id: "b9",
    name: "Buckwheat Pancakes",
    emoji: "🥞",
    mealType: "breakfast",
    cuisine: "Traditional",
    nutrition: { calories: 280, protein: 8, carbs: 42, fat: 6, fiber: 7 },
    tags: ["vegetarian", "low-cal"],
    prepTime: 15,
    goals: ["nutrition", "weight_loss"],
    recipe: {
      ingredients: [
        "Buckwheat flour",
        "1 egg",
        "Almond milk",
        "Baking powder",
        "Berries",
      ],
      steps: [
        "Mix dry and wet ingredients",
        "Cook on a non-stick griddle",
        "Serve with fresh berries",
      ],
    },
  },
  {
    id: "b10",
    name: "Poached Eggs on Spinach",
    emoji: "🥚",
    mealType: "breakfast",
    cuisine: "European",
    nutrition: { calories: 190, protein: 14, carbs: 2, fat: 12, fiber: 3 },
    tags: ["vegetarian", "high-protein", "low-cal"],
    prepTime: 10,
    goals: ["weight_loss", "pcos"],
    recipe: {
      ingredients: ["2 Eggs", "2 cups Spinach", "Garlic", "Lemon"],
      steps: [
        "Poach eggs in simmering water",
        "Sauté spinach with garlic",
        "Place eggs over spinach, squeeze lemon",
      ],
    },
  },
  {
    id: "l7",
    name: "Turkey & Avocado Wrap",
    emoji: "🌯",
    mealType: "lunch",
    cuisine: "American",
    nutrition: { calories: 380, protein: 28, carbs: 32, fat: 18, fiber: 8 },
    tags: ["high-protein"],
    prepTime: 5,
    goals: ["fitness", "weight_loss"],
    recipe: {
      ingredients: [
        "Whole grain tortilla",
        "Turkey breast",
        "Avocado",
        "Sprouts",
        "Mustard",
      ],
      steps: [
        "Spread mustard on tortilla",
        "Layer turkey and avocado",
        "Add sprouts and wrap tightly",
      ],
    },
  },
  {
    id: "l8",
    name: "Black Bean & Corn Salad",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Mexican",
    nutrition: { calories: 320, protein: 14, carbs: 45, fat: 10, fiber: 15 },
    tags: ["vegan", "vegetarian", "quick"],
    prepTime: 10,
    goals: ["nutrition", "disease_prevention"],
    recipe: {
      ingredients: [
        "Black beans",
        "Corn",
        "Red bell pepper",
        "Cilantro",
        "Lime-olive oil dressing",
      ],
      steps: [
        "Mix all ingredients in a bowl",
        "Toss with lime dressing",
        "Serve chilled",
      ],
    },
  },
  {
    id: "l9",
    name: "Grilled Shrimp Skewers",
    emoji: "🍤",
    mealType: "lunch",
    cuisine: "Coastal",
    nutrition: { calories: 260, protein: 32, carbs: 6, fat: 10, fiber: 2 },
    tags: ["high-protein", "low-cal", "quick"],
    prepTime: 15,
    goals: ["fitness", "pcos"],
    recipe: {
      ingredients: ["Shrimp", "Zucchini", "Cherry tomatoes", "Lemon", "Garlic"],
      steps: [
        "Thread shrimp and veggies onto skewers",
        "Grill for 3 mins per side",
        "Squeeze lemon over before serving",
      ],
    },
  },
  {
    id: "l10",
    name: "Miso Soup with Tofu",
    emoji: "🥣",
    mealType: "lunch",
    cuisine: "Japanese",
    nutrition: { calories: 150, protein: 10, carbs: 12, fat: 6, fiber: 3 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 10,
    goals: ["nutrition", "mental_wellness"],
    recipe: {
      ingredients: [
        "Miso paste",
        "Tofu",
        "Seaweed",
        "Green onions",
        "Dashi or water",
      ],
      steps: [
        "Heat water and dissolve miso",
        "Add cubed tofu and seaweed",
        "Simmer for 2 mins, garnish with onions",
      ],
    },
  },
  {
    id: "d7",
    name: "Roasted Chicken with Root Veggies",
    emoji: "🍗",
    mealType: "dinner",
    cuisine: "Rustic",
    nutrition: { calories: 420, protein: 36, carbs: 28, fat: 16, fiber: 6 },
    tags: ["high-protein"],
    prepTime: 45,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "Chicken breast",
        "Carrots",
        "Parsnips",
        "Rosemary",
        "Olive oil",
      ],
      steps: [
        "Toss veggies with oil and herbs",
        "Place chicken and veggies on tray",
        "Roast at 200°C for 35 mins",
      ],
    },
  },
  {
    id: "d8",
    name: "Zucchini Lasagna",
    emoji: "🍝",
    mealType: "dinner",
    cuisine: "Italian",
    nutrition: { calories: 340, protein: 24, carbs: 14, fat: 22, fiber: 4 },
    tags: ["vegetarian", "low-cal"],
    prepTime: 40,
    goals: ["pcos", "weight_loss"],
    recipe: {
      ingredients: [
        "Zucchini slices",
        "Ricotta cheese",
        "Marinara sauce",
        "Mozzarella",
        "Spinach",
      ],
      steps: [
        "Layer zucchini 'noodles' with cheese and sauce",
        "Bake at 180°C for 30 mins",
        "Let rest before serving",
      ],
    },
  },
  {
    id: "d9",
    name: "Spaghetti Squash Marinara",
    emoji: "🍝",
    mealType: "dinner",
    cuisine: "Healthy-Italian",
    nutrition: { calories: 210, protein: 6, carbs: 32, fat: 8, fiber: 7 },
    tags: ["vegan", "vegetarian", "low-cal"],
    prepTime: 30,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "Spaghetti squash",
        "Tomato sauce",
        "Fresh basil",
        "Mushrooms",
      ],
      steps: [
        "Roast and scrape squash into strands",
        "Sauté mushrooms in sauce",
        "Toss squash with sauce and basil",
      ],
    },
  },
  {
    id: "d10",
    name: "Baked Trout with Herbs",
    emoji: "🐟",
    mealType: "dinner",
    cuisine: "Nordic",
    nutrition: { calories: 320, protein: 34, carbs: 4, fat: 18, fiber: 2 },
    tags: ["high-protein", "low-cal"],
    prepTime: 20,
    goals: ["hormonal_health", "fitness"],
    recipe: {
      ingredients: [
        "Trout fillet",
        "Fresh dill",
        "Lemon",
        "Garlic",
        "Asparagus",
      ],
      steps: [
        "Place trout and asparagus on parchment",
        "Add herbs and lemon",
        "Bake at 190°C for 15 mins",
      ],
    },
  },
  {
    id: "s7",
    name: "Greek Yogurt & Pumpkin Seeds",
    emoji: "🥣",
    mealType: "snacks",
    cuisine: "Simple",
    nutrition: { calories: 160, protein: 12, carbs: 8, fat: 8, fiber: 2 },
    tags: ["vegetarian", "high-protein", "quick"],
    prepTime: 2,
    goals: ["nutrition", "pcos"],
    recipe: {
      ingredients: ["Greek yogurt", "Pumpkin seeds", "Pinch of salt"],
      steps: ["Top yogurt with seeds", "Stir and enjoy"],
    },
  },
  {
    id: "s8",
    name: "Celery with Almond Butter",
    emoji: "🥬",
    mealType: "snacks",
    cuisine: "Classic",
    nutrition: { calories: 120, protein: 4, carbs: 6, fat: 10, fiber: 3 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 3,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: ["Celery stalks", "Almond butter"],
      steps: [
        "Wash celery",
        "Spread almond butter in the hollow",
        "Eat immediately",
      ],
    },
  },
  {
    id: "s9",
    name: "Air-Popped Popcorn",
    emoji: "🍿",
    mealType: "snacks",
    cuisine: "Light",
    nutrition: { calories: 110, protein: 3, carbs: 18, fat: 2, fiber: 4 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: ["Popcorn kernels", "Nutritional yeast", "Spices"],
      steps: [
        "Pop kernels using air popper",
        "Toss with nutritional yeast",
        "Add spices like chili or garlic",
      ],
    },
  },
  {
    id: "s10",
    name: "Frozen Grapes",
    emoji: "🍇",
    mealType: "snacks",
    cuisine: "Cold",
    nutrition: { calories: 70, protein: 1, carbs: 18, fat: 0, fiber: 1 },
    tags: ["vegan", "low-cal"],
    prepTime: 2,
    goals: ["weight_loss", "mental_wellness"],
    recipe: {
      ingredients: ["Red or green grapes"],
      steps: [
        "Wash and dry grapes",
        "Freeze for at least 4 hours",
        "Enjoy as a sweet, cold treat",
      ],
    },
  },
  {
    id: "b11",
    name: "Salmon & Asparagus Frittata",
    emoji: "🍳",
    mealType: "breakfast",
    cuisine: "Italian-Inspired",
    nutrition: { calories: 260, protein: 22, carbs: 6, fat: 16, fiber: 3 },
    tags: ["vegetarian", "high-protein", "low-cal"],
    prepTime: 20,
    goals: ["pcos", "hormonal_health", "nutrition"],
    recipe: {
      ingredients: [
        "3 eggs",
        "Smoked salmon pieces",
        "Asparagus tips",
        "Dill",
        "Red onion",
      ],
      steps: [
        "Whisk eggs with dill",
        "Sauté onions and asparagus",
        "Pour eggs over and bake or cook until firm",
        "Add salmon at the end",
      ],
    },
  },
  {
    id: "l11",
    name: "Lentil & Pomegranate Salad",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Middle Eastern",
    nutrition: { calories: 310, protein: 14, carbs: 42, fat: 12, fiber: 11 },
    tags: ["vegan", "vegetarian"],
    prepTime: 15,
    goals: ["nutrition", "disease_prevention"],
    recipe: {
      ingredients: [
        "Cooked green lentils",
        "Pomegranate seeds",
        "Cucumber",
        "Mint",
        "Lemon-Olive oil dressing",
      ],
      steps: [
        "Combine all ingredients in a bowl",
        "Drizzle with dressing",
        "Garnish with extra mint",
      ],
    },
  },
  {
    id: "d11",
    name: "Quinoa Stuffed Peppers",
    emoji: "🫑",
    mealType: "dinner",
    cuisine: "Mediterranean",
    nutrition: { calories: 380, protein: 16, carbs: 48, fat: 14, fiber: 10 },
    tags: ["vegetarian", "high-protein"],
    prepTime: 45,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "Bell peppers",
        "Cooked quinoa",
        "Black beans",
        "Feta cheese",
        "Tomato sauce",
      ],
      steps: [
        "Mix quinoa, beans, and sauce",
        "Stuff into hollowed peppers",
        "Top with feta and bake at 190°C for 35 mins",
      ],
    },
  },
  {
    id: "s11",
    name: "Edamame with Sea Salt",
    emoji: "🫛",
    mealType: "snacks",
    cuisine: "Japanese",
    nutrition: { calories: 120, protein: 11, carbs: 9, fat: 5, fiber: 5 },
    tags: ["vegan", "high-protein", "quick"],
    prepTime: 5,
    goals: ["fitness", "pcos"],
    recipe: {
      ingredients: ["Edamame pods", "Flaky sea salt"],
      steps: [
        "Steam or boil edamame for 5 mins",
        "Drain and sprinkle with sea salt",
        "Serve warm",
      ],
    },
  },
  {
    id: "s12",
    name: "Cottage Cheese & Pineapple",
    emoji: "🥣",
    mealType: "snacks",
    cuisine: "Simple",
    nutrition: { calories: 140, protein: 14, carbs: 16, fat: 2, fiber: 1 },
    tags: ["vegetarian", "high-protein", "quick"],
    prepTime: 2,
    goals: ["fitness", "weight_loss"],
    recipe: {
      ingredients: ["Low-fat cottage cheese", "Pineapple chunks"],
      steps: [
        "Place cottage cheese in a bowl",
        "Top with fresh pineapple",
        "Enjoy immediately",
      ],
    },
  },
];

type MealTab = "breakfast" | "lunch" | "dinner" | "snacks";
type FilterTag =
  | "vegetarian"
  | "vegan"
  | "high-protein"
  | "low-cal"
  | "quick"
  | "pcos-friendly";

const TABS: { key: MealTab; label: string; emoji: string }[] = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅" },
  { key: "lunch", label: "Lunch", emoji: "☀️" },
  { key: "dinner", label: "Dinner", emoji: "🌙" },
  { key: "snacks", label: "Snacks", emoji: "🍎" },
];

const FILTER_TAGS: { key: FilterTag; label: string }[] = [
  { key: "vegetarian", label: "🥬 Vegetarian" },
  { key: "vegan", label: "🌱 Vegan" },
  { key: "high-protein", label: "💪 High-Protein" },
  { key: "low-cal", label: "⚡ Low-Cal" },
  { key: "quick", label: "⏱ Under 30 min" },
  { key: "pcos-friendly", label: "🌸 PCOS Friendly" },
];

const GOAL_LABELS: Record<HealthGoal, string> = {
  weight_loss: "Weight Loss",
  mental_wellness: "Mental Wellness",
  fitness: "Fitness",
  nutrition: "Nutrition",
  disease_prevention: "Disease Prevention",
  pcos: "PCOS Management",
  hormonal_health: "Hormonal Balance",
};

const LIFESTYLE_LABELS: Record<Lifestyle, string> = {
  sedentary: "Sedentary",
  active: "Active",
  athletic: "Athletic",
};

const MACRO_COLORS = ["#3b82f6", "#14b8a6", "#f59e0b", "#ef4444"];

export default function DietPage() {
  const { userProfile } = useHealthStore();
  const { data: favorites, isLoading: favsLoading } = useDietFavorites();
  const addFavorite = useAddDietFavorite();
  const removeFavorite = useRemoveDietFavorite();

  const [activeTab, setActiveTab] = useState<MealTab | "favorites">(
    "breakfast",
  );
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const favoriteNames = new Set((favorites ?? []).map((f) => f.mealName));

  const toggleFilter = (tag: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const toggleFavorite = (meal: Meal) => {
    const existing = (favorites ?? []).find((f) => f.mealName === meal.name);
    if (existing) {
      removeFavorite.mutate(existing.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite.mutate({
        mealName: meal.name,
        calories: meal.nutrition.calories,
        category: meal.mealType,
      });
      toast.success("Added to favorites ❤️");
    }
  };

  const displayedMeals = useMemo(() => {
    if (activeTab === "favorites") return [];
    const tabMeals = MEALS.filter((m) => m.mealType === activeTab);
    if (activeFilters.size === 0) return tabMeals;
    return tabMeals.filter((m) =>
      [...activeFilters].every((f) => {
        if (f === "quick") return m.prepTime <= 30;
        if (f === "pcos-friendly") return m.goals.includes("pcos");
        return m.tags.includes(f);
      }),
    );
  }, [activeTab, activeFilters]);

  const favoriteMeals = useMemo(() => {
    if (activeTab !== "favorites") return [];
    const favNames = new Set((favorites ?? []).map((f) => f.mealName));
    return MEALS.filter((m) => favNames.has(m.name));
  }, [activeTab, favorites]);

  const mealsToRender =
    activeTab === "favorites" ? favoriteMeals : displayedMeals;

  const macroData = selectedMeal
    ? [
        { name: "Protein", value: selectedMeal.nutrition.protein },
        { name: "Carbs", value: selectedMeal.nutrition.carbs },
        { name: "Fat", value: selectedMeal.nutrition.fat },
        { name: "Fiber", value: selectedMeal.nutrition.fiber },
      ]
    : [];

  return (
    <div
      data-ocid="diet.page"
      className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-subtle">
          <span className="text-2xl">🥗</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Diet & Nutrition
          </h1>
          <p className="text-sm text-muted-foreground">
            Personalized meal recommendations for your goals
          </p>
        </div>
      </motion.div>

      {/* Profile Banner */}
      {userProfile && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex flex-wrap items-center gap-3"
        >
          <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
            📊 Based on your profile:
          </span>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-0"
            >
              {LIFESTYLE_LABELS[userProfile.lifestyle]}
            </Badge>
            {userProfile.goals.slice(0, 3).map((g) => (
              <Badge
                key={g}
                variant="secondary"
                className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-0"
              >
                {GOAL_LABELS[g]}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Overview Bento Layout */}
      <DietOverview />

      {/* Filter Chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-2"
      >
        {FILTER_TAGS.map((f) => (
          <button
            key={f.key}
            type="button"
            data-ocid={`diet.filter_${f.key}.toggle`}
            onClick={() => toggleFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              activeFilters.has(f.key)
                ? "gradient-primary text-white border-transparent shadow-subtle"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        {activeFilters.size > 0 && (
          <button
            type="button"
            onClick={() => setActiveFilters(new Set())}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <X size={10} /> Clear
          </button>
        )}
      </motion.div>

      {/* Tabs */}
      <div
        data-ocid="diet.tabs"
        className="flex gap-1 bg-muted/40 p-1 rounded-xl"
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            data-ocid={`diet.${t.key}.tab`}
            onClick={() => setActiveTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === t.key
                ? "gradient-primary text-white shadow-subtle"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="hidden sm:inline">{t.emoji}</span>
            {t.label}
          </button>
        ))}
        <button
          type="button"
          data-ocid="diet.favorites.tab"
          onClick={() => setActiveTab("favorites")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            activeTab === "favorites"
              ? "gradient-primary text-white shadow-subtle"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart size={14} />
          <span className="hidden sm:inline">Favorites</span>
        </button>
      </div>

      {/* Dietary Tips & Foods to Avoid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-5">
          <h3 className="text-red-600 dark:text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
            <span className="text-lg">🚫</span> Foods to Avoid for a Healthy
            Lifestyle
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-red-400">•</span> Refined carbs (white
              bread, white rice, pastries)
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-red-400">•</span> Sugary snacks & sweetened
              beverages (soda, juice)
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-red-400">•</span> Processed meats (sausages,
              deli meats)
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-red-400">•</span> Deep-fried & highly
              processed fast foods
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-red-400">•</span> High-glycemic index fruits
              (dried fruits, canned syrup)
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-red-400">•</span> Dairy products (if insulin
              sensitive)
            </li>
          </ul>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-5">
          <h3 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
            <span className="text-lg">💡</span> Dietary Tips for You
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-emerald-400">✓</span> Increase fiber intake
              (vegetables, legumes)
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-emerald-400">✓</span> Add lean protein to
              every meal to balance blood sugar
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-emerald-400">✓</span> Include
              anti-inflammatory foods (turmeric, omega-3s)
            </li>
            <li className="text-sm text-muted-foreground flex gap-2">
              <span className="text-emerald-400">✓</span> Stay hydrated! Drink
              at least 2.5L of water daily
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Meals Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "favorites" && favsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["a", "b", "c"].map((k) => (
                <Skeleton key={k} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : mealsToRender.length === 0 ? (
            <div
              data-ocid="diet.meals.empty_state"
              className="py-16 flex flex-col items-center gap-3 text-center"
            >
              <span className="text-5xl opacity-30">
                {activeTab === "favorites" ? "💔" : "🥗"}
              </span>
              <p className="font-medium text-muted-foreground">
                {activeTab === "favorites"
                  ? "No favorites yet — heart a meal to save it here!"
                  : "No meals match your filters. Try removing some filters."}
              </p>
              {activeTab === "favorites" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("breakfast")}
                >
                  Browse Meals
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealsToRender.map((meal, i) => (
                <motion.div
                  key={meal.id}
                  data-ocid={`diet.meal.item.${i + 1}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card rounded-2xl border border-border shadow-subtle hover:shadow-elevated hover:-translate-y-1 transition-all group relative overflow-hidden"
                >
                  {/* Gradient accent line */}
                  <div className="h-1 w-full bg-gradient-to-r from-green-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="p-5 space-y-3">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center text-2xl flex-shrink-0">
                          {meal.emoji}
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-tight">
                            {meal.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4"
                            >
                              {meal.cuisine}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        data-ocid={`diet.favorite_${i + 1}.toggle`}
                        onClick={() => toggleFavorite(meal)}
                        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors"
                        aria-label={
                          favoriteNames.has(meal.name)
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <Heart
                          size={16}
                          className={`transition-colors ${
                            favoriteNames.has(meal.name)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground hover:text-red-400"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Macros */}
                    <div className="grid grid-cols-5 gap-1 bg-muted/30 rounded-xl p-2">
                      {[
                        {
                          label: "Cal",
                          value: meal.nutrition.calories,
                          unit: "",
                        },
                        {
                          label: "Prot",
                          value: meal.nutrition.protein,
                          unit: "g",
                        },
                        {
                          label: "Carbs",
                          value: meal.nutrition.carbs,
                          unit: "g",
                        },
                        { label: "Fat", value: meal.nutrition.fat, unit: "g" },
                        {
                          label: "Fiber",
                          value: meal.nutrition.fiber,
                          unit: "g",
                        },
                      ].map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="text-xs font-bold text-foreground">
                            {m.value}
                            {m.unit}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {meal.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium flex items-center gap-1">
                        <Clock size={9} />
                        {meal.prepTime}m
                      </span>
                    </div>

                    {/* View Recipe */}
                    <Button
                      data-ocid={`diet.view_recipe_${i + 1}.button`}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-8 border-primary/30 text-primary hover:bg-primary/5"
                      onClick={() => setSelectedMeal(meal)}
                    >
                      View Recipe 📖
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Recipe Modal */}
      <Dialog
        open={!!selectedMeal}
        onOpenChange={(open) => !open && setSelectedMeal(null)}
      >
        <DialogContent
          data-ocid="diet.recipe.dialog"
          className="max-w-xl max-h-[90vh] overflow-y-auto"
        >
          {selectedMeal && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-lg">
                  <span className="text-3xl">{selectedMeal.emoji}</span>
                  <span>{selectedMeal.name}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Macro chart */}
                <div className="bg-muted/30 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Nutritional Breakdown
                  </h4>
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          innerRadius={32}
                          outerRadius={52}
                          dataKey="value"
                          paddingAngle={2}
                        >
                          {macroData.map((_entry, idx) => (
                            <Cell key={_entry.name} fill={MACRO_COLORS[idx]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ fontSize: 11, borderRadius: 8 }}
                          formatter={(v: number) => [`${v}g`, ""]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-1.5">
                      {[
                        {
                          label: "Calories",
                          value: `${selectedMeal.nutrition.calories} kcal`,
                          color: MACRO_COLORS[0],
                        },
                        {
                          label: "Protein",
                          value: `${selectedMeal.nutrition.protein}g`,
                          color: MACRO_COLORS[0],
                        },
                        {
                          label: "Carbohydrates",
                          value: `${selectedMeal.nutrition.carbs}g`,
                          color: MACRO_COLORS[1],
                        },
                        {
                          label: "Fat",
                          value: `${selectedMeal.nutrition.fat}g`,
                          color: MACRO_COLORS[2],
                        },
                        {
                          label: "Fiber",
                          value: `${selectedMeal.nutrition.fiber}g`,
                          color: MACRO_COLORS[3] || "#a855f7",
                        },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-muted-foreground flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                              style={{ background: m.color }}
                            />
                            {m.label}
                          </span>
                          <span className="font-semibold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Clock size={12} /> {selectedMeal.prepTime} min prep
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Flame size={12} /> {selectedMeal.nutrition.calories} kcal
                  </Badge>
                  <Badge variant="secondary">{selectedMeal.cuisine}</Badge>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">🛒 Ingredients</h4>
                  <ul className="space-y-1.5">
                    {selectedMeal.recipe.ingredients.map((ing) => (
                      <li key={ing} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    👨‍🍳 Cooking Steps
                  </h4>
                  <ol className="space-y-2.5">
                    {selectedMeal.recipe.steps.map((step, i) => (
                      <li key={step} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    data-ocid="diet.recipe.close_button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedMeal(null)}
                  >
                    Close
                  </Button>
                  <Button
                    data-ocid="diet.recipe.favorite_button"
                    className="flex-1 gradient-primary border-0 text-white gap-2"
                    onClick={() => {
                      toggleFavorite(selectedMeal);
                    }}
                  >
                    <Heart
                      size={14}
                      className={
                        favoriteNames.has(selectedMeal.name) ? "fill-white" : ""
                      }
                    />
                    {favoriteNames.has(selectedMeal.name)
                      ? "Unfavorite"
                      : "Save Favorite"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
