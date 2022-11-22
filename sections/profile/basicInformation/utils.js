import countriesPhoneCodes from "utils/countriesPhoneCodes";
import { getGroupsData } from "../utils";

export const getInitialValues = ({ business, businessGroups }) => {
  if (business) {
    const { types, cuisines, foodsAndDrinks, quirks, diets, michelinStars } =
      getGroupsData(businessGroups);

    const phoneCountry = countriesPhoneCodes.find(
      ({ value: { code, prefix } }) =>
        code === business.get("phoneCountryCode") &&
        prefix === business.get("phoneCountryPrefix")
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
      email: business.get("email"),
      phone: business.get("phone"),
      phoneCountry,
      website: business.get("website"),
      facebook: business.get("facebook"),
      instagram: business.get("instagram"),
      youtube: business.get("youtube"),
      types,
      cuisines,
      foodsAndDrinks,
      quirks,
      diets,
      michelinStars
    };
  }
  return undefined;
};

export const getGroupsValues = groups => groups.map(g => g.value).toString();

export const isSelectValueChanged = (originalValue, checkValue) =>
  (originalValue && checkValue && checkValue.value !== originalValue.value) ||
  (originalValue && !checkValue);
