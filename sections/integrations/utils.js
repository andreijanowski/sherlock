export const categories = [
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
  "packaging",
  "social_media",
  "stock_management",
  "wholesaler",
  "photography",
  "hardware",
  "other"
];

export const generateMenuItems = (t, activeTab) =>
  categories.map(category => ({
    route: `/app/integrations?category=${category}`,
    label: t(`app:manageIntegrations.${category}`),
    isActive: activeTab === category
  }));
