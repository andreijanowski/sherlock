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
