import iso3166 from "iso-3166-2";
import { getGroupsData } from "../utils";

export const countries = Object.entries(iso3166.data)
  .map(i => ({
    value: i[0],
    label: i[1].name
  }))
  .sort((a, b) => (a.label > b.label ? 1 : -1));

export const getSubdivisions = country =>
  Object.entries(iso3166.country(country).sub).map(i => ({
    value: i[0],
    label: i[1].name.replace(", City of", "")
  }));

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
