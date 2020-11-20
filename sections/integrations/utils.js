export const PARTNERS_CATEGORIES = [
  "pos",
  "delivery_and_take_away",
  "booking",
  "community_management",
  "delivery_management",
  "finances_and_payments",
  "food_waste",
  "hr_and_shift_planning",
  "hygiene_solutions",
  "logistics",
  "mystery_shopping",
  "social_media",
  "stock_management",
  "photography",
  "hardware",
  "other"
];

export const WHOLESALERS_CATEGORIES = [
  "allProducts",
  "new",
  "fruits_and_vegetables",
  "meat",
  "fish",
  "bread_and_flour",
  "diary_products",
  "sweets_and_desserts",
  "frozen_products",
  "sauces_and_oils",
  "beers",
  "wine_and_alcohol",
  "soft_drinks",
  "food_packaging",
  "tableware",
  "hygiene",
  "other"
];

export const generatePartnersMenuItems = (t, activeTab) =>
  PARTNERS_CATEGORIES.map(category => ({
    route: `/app/integrations?category=${category}`,
    label: t(`app:manageIntegrations.${category}`),
    isActive: activeTab === category
  }));

export const generateWholesalersMenuItems = (t, activeTab) =>
  WHOLESALERS_CATEGORIES.map(category => ({
    route: `/app/wholesalers?category=${category}`,
    label: t(`app:wholesalersCategories.${category}`),
    isActive: activeTab === category
  }));
