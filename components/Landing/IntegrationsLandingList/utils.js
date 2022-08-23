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

export const getSortedPartners = partners =>
  partners?.sort((a, b) => {
    const aStatus = a.attributes.status;
    const bStatus = b.attributes.status;

    if (aStatus === 'available' && bStatus !== 'available') return -1;
    if (aStatus !== 'available' && bStatus === 'available') return 1;

    return 0;
  });
