import { getGroupsData } from "../utils";

export const getInitialValues = ({ business, businessGroups }) => {
  if (business) {
    const { types, cuisines, foodsAndDrinks, quirks, diets } = getGroupsData(
      businessGroups
    );

    return {
      name: business.get("name"),
      tagline: business.get("tagline"),
      country: {
        label: business.get("country") || "",
        value: business.get("countryCode") || ""
      },
      region: {
        label: business.get("region") || "",
        value: business.get("regionCode") || ""
      },
      street: business.get("street"),
      streetNumber: business.get("streetNumber"),
      city: business.get("city"),
      postCode: business.get("postCode"),
      ownerRole: business.get("ownerRole"),
      bio: business.get("bio"),
      types,
      cuisines,
      foodsAndDrinks,
      quirks,
      diets
    };
  }
  return undefined;
};

export const getGroupsValues = groups => groups.map(g => g.value).toString();
