const ONE_DAY_IN_SECONDS = 86400;

export const generateSlotsArray = ({ from, to, slots }) => {
  let i = 0;
  const slotsArray = [];
  if (from < to) {
    while (from + slots * i < to) {
      slotsArray.push(from + slots * i);
      i += 1;
    }
  } else {
    while (from + slots * i < to + ONE_DAY_IN_SECONDS) {
      slotsArray.push(from + slots * i);
      i += 1;
    }
  }
  return slotsArray;
};
