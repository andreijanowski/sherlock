export const getPrefix = name => `landings.${name}`;

export const getOptionPrefix = (optionIndex, itemIndex) =>
  `options.${optionIndex}.${itemIndex}`;

export const getDescriptionPrefix = optionIndex =>
  `${getOptionPrefix(optionIndex)}.description`;

export const getAdvPrefix = ({ optionIndex, advIndex }) =>
  `${getOptionPrefix(optionIndex)}.advantages.${advIndex}`;
