import { getGroupsData } from "../utils";

export const getInitialValues = business => {
  if (business) {
    const {
      name,
      tagline,
      country,
      countryCode,
      region,
      regionCode,
      street,
      streetNumber,
      city,
      postCode,
      ownerRole,
      bio,
      groups
    } = business;

    const { types, cuisines, foodsAndDrinks, quirks, diets } = getGroupsData(
      groups
    );

    return {
      name,
      tagline,
      country: {
        label: country || "",
        value: countryCode || ""
      },
      region: {
        label: region || "",
        value: regionCode || ""
      },
      street,
      streetNumber,
      city,
      postCode,
      ownerRole,
      bio,
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
