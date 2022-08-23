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

export const getFilteredPartners = partners =>
  Boolean(partners.length) &&
  partners.sort((a, b) => {
    if (
      a.attributes.status === "available" &&
      b.attributes.status !== "available"
    ) {
      return -1;
    }
    if (
      b.attributes.status === "available" &&
      a.attributes.status !== "available"
    ) {
      return 1;
    }
    return 0;
  });
