import { PARTNERS_CATEGORIES } from "sections/integrations/utils";

export const getConfig = t => [
  {
    id: "allCategories",
    label: t("allOurCategories"),
    items: PARTNERS_CATEGORIES.slice(1).map(category => ({
      id: category,
      label: t(`manageIntegrations.${category}`),
      groups: [
        {
          partners: []
        }
      ]
    }))
  }
];
