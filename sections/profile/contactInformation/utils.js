/* eslint-disable import/prefer-default-export */
import { countries } from "countries-list";

const countriesPhoneCodes = [];
Object.entries(countries)
  .sort((a, b) => (a[1].name < b[1].name ? -1 : 1))
  .forEach(i => {
    const phoneCodes = i[1].phone.split(",");
    phoneCodes.forEach(p => {
      countriesPhoneCodes.push({
        label: `+${p}`,
        value: {
          code: i[0],
          name: i[1].name,
          native: i[1].native,
          prefix: p
        }
      });
    });
  });

export { countriesPhoneCodes };

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
