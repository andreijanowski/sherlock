import iso3166 from "iso-3166-2";

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

export const getGroupsByParentGroups = (groups, parentGroups) =>
  groups
    .filter(g => parentGroups.indexOf(g.parentGroup) !== -1)
    .map(g => ({ label: g.name, value: g.slug }));

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
      postCode,
      ownerRole,
      bio,
      groups
    } = business;

    const types = getGroupsByParentGroups(groups, ["types"]);
    const cuisines = getGroupsByParentGroups(groups, ["cuisines"]);
    const foodsAndDrinks = getGroupsByParentGroups(groups, ["foods", "drinks"]);
    const quirks = getGroupsByParentGroups(groups, ["quirks"]);
    const diets = getGroupsByParentGroups(groups, ["diets"]);

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
