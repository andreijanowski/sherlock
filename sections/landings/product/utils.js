export const getPrefix = name => `integrationsLandings.${name}`;

export const getOptionPrefix = optionIndex => `options.${optionIndex}`;

export const getDescriptionPrefix = optionIndex =>
  `${getOptionPrefix(optionIndex)}.description`;

export const getAdvPrefix = ({ optionIndex, advIndex }) =>
  `${getOptionPrefix(optionIndex)}.advantages.${advIndex}`;
