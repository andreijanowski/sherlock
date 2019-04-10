import countriesPhoneCodes from "utils/countriesPhoneCodes";

export const getInitialValues = business => {
  if (business) {
    const {
      email,
      phone,
      phoneCountryPrefix,
      phoneCountryCode,
      website,
      instagram
    } = business;

    const phoneCountry = countriesPhoneCodes.find(
      ({ value: { code, prefix } }) =>
        code === phoneCountryCode && prefix === phoneCountryPrefix
    );

    return {
      email,
      phone,
      phoneCountry,
      website,
      instagram
    };
  }
  return undefined;
};
