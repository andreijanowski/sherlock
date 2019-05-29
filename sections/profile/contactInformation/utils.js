import countriesPhoneCodes from "utils/countriesPhoneCodes";

export const getInitialValues = business => {
  if (business) {
    const phoneCountry = countriesPhoneCodes.find(
      ({ value: { code, prefix } }) =>
        code === business.get("phoneCountryCode") &&
        prefix === business.get("phoneCountryPrefix")
    );

    return {
      email: business.get("email"),
      phone: business.get("phone"),
      phoneCountry,
      website: business.get("website"),
      facebook: business.get("facebook"),
      instagram: business.get("instagram")
    };
  }
  return undefined;
};
