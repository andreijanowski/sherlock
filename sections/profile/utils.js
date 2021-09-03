export const generateMenuItems = (
  t,
  active,
  showPublishModal,
  state,
  unpublishBusiness
) => {
  const menuItems = [
    {
      route: `/app/profile/basic-information/`,
      label: t("app:manageProfile.basicInformation"),
      isActive: active === "basicInformation"
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
      route: `/app/profile/redirection-links/`,
      label: t("additionalInformation:redirectionLinks"),
      isActive: active === "redirectionLinks"
    },
    {
      route: `/app/profile/members/`,
      label: t("app:manageProfile.inviteYourTeam"),
      isActive: active === "inviteYourTeam"
    },
    {
      route: `/app/profile/live-info/`,
      label: t("app:manageProfile.liveInfo"),
      isActive: active === "liveInfo"
    },
    {
      route: `/app/profile/widgets/`,
      label: t("app:manageProfile.widgets"),
      isActive: active === "widgets"
    },
    {
      onClick: state === "published" ? unpublishBusiness : showPublishModal,
      label:
        state === "published"
          ? t("app:manageProfile.unPublish")
          : t("app:manageProfile.publish"),
      color: state === "published" ? "ruby" : "green"
    }
  ];

  if (state === "waiting_for_approval") {
    menuItems[8] = {
      label: t("app:manageProfile.waitingForApproval"),
      color: "carrotOrange"
    };
  }

  return menuItems;
};

const getGroupsByParentGroups = (groups, parentGroups) =>
  groups
    ? groups
        .filter(
          g =>
            (parentGroups || []).indexOf(
              g.getIn(["attributes", "parentGroup"])
            ) !== -1
        )
        .map(g => ({
          label: g.getIn(["attributes", "name"]),
          value: g.getIn(["attributes", "slug"])
        }))
        .sort((a, b) => {
          if (a.label > b.label) {
            return 1;
          }
          if (a.label < b.label) {
            return -1;
          }
          return 0;
        })
        .toList()
        .toArray()
    : [];

export const getGroupsData = groups => {
  const types = getGroupsByParentGroups(groups, ["types"]);
  const cuisines = getGroupsByParentGroups(groups, ["cuisines"]);
  const foodsAndDrinks = getGroupsByParentGroups(groups, ["foods", "drinks"]);
  const quirks = getGroupsByParentGroups(groups, ["quirks"]);
  const diets = getGroupsByParentGroups(groups, ["diets"]);
  const michelinStars = getGroupsByParentGroups(groups, ["michelin_stars"]);
  return { types, cuisines, foodsAndDrinks, quirks, diets, michelinStars };
};

const checkLengthRange = (array, minLength, maxLength) =>
  array.length >= minLength && array.length <= maxLength;

const checkIsBasicInformationValid = (business, businessGroups) => {
  const { types, cuisines, foodsAndDrinks, quirks } = getGroupsData(
    businessGroups
  );
  return (
    business.get("name") &&
    business.get("city") &&
    business.get("postCode") &&
    business.get("street") &&
    business.get("countryCode") &&
    businessGroups &&
    checkLengthRange(types, 1, 3) &&
    checkLengthRange(cuisines, 1, 5) &&
    checkLengthRange(foodsAndDrinks, 1, 6) &&
    checkLengthRange(quirks, 3, 10)
  );
};

const checkIsFilled = ({
  index,
  business,
  businessMenus,
  businessPictures,
  businessProducts,
  businessOpenPeriods
}) => {
  switch (index) {
    case 1: {
      return (
        business.get("email") ||
        business.get("phone") ||
        (business.get("phoneCountryPrefix") &&
          business.get("phoneCountryCode")) ||
        business.get("website") ||
        business.get("instagram") ||
        business.get("youtube")
      );
    }
    case 2: {
      return businessOpenPeriods && businessOpenPeriods.size;
    }
    case 3: {
      return (
        business.getIn(["logo", "url"]) ||
        (businessPictures && businessPictures.size) ||
        (businessMenus && businessMenus.size) ||
        (businessProducts && businessProducts.size)
      );
    }
    case 4: {
      return (
        business.get("breakfastService") ||
        business.get("lunchService") ||
        business.get("dinnerService") ||
        business.get("brunchService") ||
        business.get("cafeService") ||
        business.get("snackService") ||
        business.get("currency") ||
        business.get("pricePerPerson") ||
        business.get("hasCatering") ||
        business.get("deliveryUrl") ||
        business.get("onlineBookingUrl") ||
        business.get("takeawayUrl") ||
        business.get("canPayWithCards") ||
        business.get("canPayWithCash") ||
        business.get("canPayWithMobile") ||
        business.get("secretCode")
      );
    }
    default: {
      return false;
    }
  }
};

export const generatePublishModalItems = ({
  t,
  business,
  businessGroups,
  businessMenus,
  businessPictures,
  businessProducts,
  businessOpenPeriods
}) => {
  const tips = [
    t("publishModal:basicInformationTip"),
    t("publishModal:contactInformationTip"),
    t("publishModal:openingHoursTip"),
    t("publishModal:picturesAndMenusTip"),
    t("publishModal:additionalInformationTip")
  ];
  const items = generateMenuItems(t);
  const isBasicInformationValid = !!checkIsBasicInformationValid(
    business,
    businessGroups
  );
  return tips.map((item, index) => ({
    name: items[index].label,
    route: `${items[index].route}?isErrorVisibilityRequired=true`,
    tip: item,
    isValid: index === 0 ? isBasicInformationValid : true,
    isFilled:
      index === 0
        ? isBasicInformationValid
        : !!checkIsFilled({
            index,
            business,
            businessMenus,
            businessPictures,
            businessProducts,
            businessOpenPeriods
          })
  }));
};
