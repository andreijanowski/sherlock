export const getInitialValues = business => {
  if (business) {
    return {
      liveInfo: business.get("liveInfo")
    };
  }
  return undefined;
};
