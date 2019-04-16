export const generateMenuItems = (t, active, showPublishModal, state) => {
  const menuItems = [
    {
      route: `/app/profile/basic-information/`,
      label: t("app:manageProfile.basicInformation"),
      isActive: active === "basicInformation"
    },
    {
      route: `/app/profile/contact-information/`,
      label: t("app:manageProfile.contactInformation"),
      isActive: active === "contactInformation"
    },
    {
      route: `/app/profile/opening-hours/`,
      label: t("app:manageProfile.openingHours"),
      isActive: active === "openingHours"
    },
    {
      route: `/app/profile/pictures-and-menus/`,
      label: t("app:manageProfile.picturesAndMenus"),
      isActive: active === "picturesAndMenus"
    },
    {
      route: `/app/profile/additional-information/`,
      label: t("app:manageProfile.additionalInformation"),
      isActive: active === "additionalInformation"
    },
    {
      route: `/app/profile/members/`,
      label: t("app:manageProfile.inviteYourTeam"),
      isActive: active === "inviteYourTeam"
    },
    {
      onClick: showPublishModal,
      label: t("app:manageProfile.publish"),
      isActive: false
    }
  ];
  if (state === "published" || state === "waiting_for_approval") {
    menuItems.pop();
  }
  return menuItems;
};

const getGroupsByParentGroups = (groups, parentGroups) =>
  groups
    .filter(g => (parentGroups || []).indexOf(g.parentGroup) !== -1)
    .map(g => ({ label: g.name, value: g.slug }));

export const getGroupsData = groups => {
  const types = getGroupsByParentGroups(groups, ["types"]);
  const cuisines = getGroupsByParentGroups(groups, ["cuisines"]);
  const foodsAndDrinks = getGroupsByParentGroups(groups, ["foods", "drinks"]);
  const quirks = getGroupsByParentGroups(groups, ["quirks"]);
  const diets = getGroupsByParentGroups(groups, ["diets"]);
  return { types, cuisines, foodsAndDrinks, quirks, diets };
};

const checkLengthRange = (array, minLength, maxLength) =>
  array.length >= minLength && array.length <= maxLength;

const checkIsBasicInformationValid = business => {
  const { name, city, postCode, street, countryCode, groups } = business;
  const { types, cuisines, foodsAndDrinks, quirks } = getGroupsData(groups);
  return (
    name &&
    city &&
    postCode &&
    street &&
    countryCode &&
    groups &&
    checkLengthRange(types, 1, 3) &&
    checkLengthRange(cuisines, 1, 5) &&
    checkLengthRange(foodsAndDrinks, 1, 6) &&
    checkLengthRange(quirks, 3, 10)
  );
};

const checkIsFilled = (index, business) => {
  switch (index) {
    case 1: {
      const {
        email,
        phone,
        phoneCountryPrefix,
        phoneCountryCode,
        website,
        instagram
      } = business;
      return (
        email ||
        phone ||
        (phoneCountryPrefix && phoneCountryCode) ||
        website ||
        instagram
      );
    }
    case 2: {
      const { openPeriods } = business;
      return openPeriods.length;
    }
    case 3: {
      const {
        logo: { url },
        pictures,
        menus,
        products
      } = business;
      return url || pictures.length || menus.length || products.length;
    }
    case 4: {
      const {
        breakfastService,
        lunchService,
        dinnerService,
        brunchService,
        cafeService,
        snackService,
        currency,
        pricePerPerson,
        hasCatering,
        deliveryUrl,
        onlineBookingUrl,
        takeawayUrl,
        canPayWithCards,
        canPayWithCash,
        canPayWithMobile,
        secretCode
      } = business;
      return (
        breakfastService ||
        lunchService ||
        dinnerService ||
        brunchService ||
        cafeService ||
        snackService ||
        currency ||
        pricePerPerson ||
        hasCatering ||
        deliveryUrl ||
        onlineBookingUrl ||
        takeawayUrl ||
        canPayWithCards ||
        canPayWithCash ||
        canPayWithMobile ||
        secretCode
      );
    }
    default: {
      return false;
    }
  }
};

export const generatePublishModalItems = (t, business) => {
  const tips = [
    t("publishModal:basicInformationTip"),
    t("publishModal:contactInformationTip"),
    t("publishModal:openingHoursTip"),
    t("publishModal:picturesAndMenusTip"),
    t("publishModal:additionalInformationTip")
  ];
  const items = generateMenuItems(t);
  const isBasicInformationValid = !!checkIsBasicInformationValid(business);
  return tips.map((item, index) => ({
    name: items[index].label,
    route: `${items[index].route}?forceShowError=true`,
    tip: item,
    isValid: index === 0 ? isBasicInformationValid : true,
    isFilled:
      index === 0 ? isBasicInformationValid : !!checkIsFilled(index, business)
  }));
};
