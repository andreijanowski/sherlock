import countriesPhoneCodes from "utils/countriesPhoneCodes";

export const getInitialValues = business => {
  if (business) {
    const {
      email,
      phone,
      phoneCountryPrefix,
      phoneCountryCode,
      website,
      facebook,
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
      facebook,
      instagram
    };
  }
  return undefined;
};
