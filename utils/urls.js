/**
 * @param {String} url
 */
export const addProtocol = url => {
  if (!url) {
    return url;
  }

  const divider = "://";
  const hasNoDivider = url.indexOf(divider) < 0;

  if (hasNoDivider) {
    return `https://${url}`;
  }

  const divided = url.split(divider);

  return `https${divider}${divided[1]}`;
};

export const getUrlSection = (str, operator, level) => {
  return str.split(`${operator}`)[level];
};
