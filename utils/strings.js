export const capitalize = str =>
  str
    .slice(0, 1)
    .toLocaleUpperCase()
    .concat(str.slice(1));
