/* eslint-disable import/prefer-default-export */

export const getInitialValues = business => {
  if (business) {
    const { logo } = business;

    return {
      logo
    };
  }
  return undefined;
};
