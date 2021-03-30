/**
 * @param {String} url
 */
export const addProtocol = (url = "") => {
  const divider = "://";
  const hasNoDivider = url.indexOf(divider) < 0;

  if (hasNoDivider) {
    return `https://${url}`;
  }

  const divided = url.split(divider);

  return `https${divider}${divided[1]}`;
};
