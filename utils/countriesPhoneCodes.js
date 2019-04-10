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

export default countriesPhoneCodes;
