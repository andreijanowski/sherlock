import moment from "moment";

export const TOTAL_BUDGET_KEY = "totalMonthlyBudget";
const BAR_BUDGET_KEY = "monthlyBarsBudget";
const RESTAURANTS_BUDGET_KEY = "monthlyRestaurantsBudget";
const DELIVERY_TAKEAWAY_BUDGET_KEY = "monthlyDeliveryTakeawayBudget";
const PARTIAL_BUDGET_KEYS = [
  BAR_BUDGET_KEY,
  RESTAURANTS_BUDGET_KEY,
  DELIVERY_TAKEAWAY_BUDGET_KEY
];
export const BUDGET_KEYS = [TOTAL_BUDGET_KEY].concat(PARTIAL_BUDGET_KEYS);

export const PERSONAL_DATA_KEYS = ["phone", "email", "country", "birthday"];

export const ALLERGIES_KEY = "allergies";
export const FAVOURITE_FOOD_KEY = "favouriteFood";
export const FAVOURITE_DRINK_KEY = "favouriteDrink";
export const TAGS_KEYS = [
  ALLERGIES_KEY,
  FAVOURITE_FOOD_KEY,
  FAVOURITE_DRINK_KEY
];

export const EMPTY_VALUE = "—";
const AVATAR_PLACEHOLDER_URL = "/static/img/avatarPlaceholder.png";
const BIRTHDAY_FORMAT = "LL";

const prepareStringTags = arr => arr.filter(Boolean).map(str => str.trim());

export const getClientAvatar = client =>
  client.getIn(["attributes", "avatar", "url"]) || AVATAR_PLACEHOLDER_URL;

export const getClientPhone = client => {
  const phone = [
    client.getIn(["attributes", "phoneCountryPrefix"]),
    client.getIn(["attributes", "phone"])
  ]
    .filter(Boolean)
    .join("");

  return phone ? `+${phone}` : null;
};

export const getClientTotalBudget = client =>
  PARTIAL_BUDGET_KEYS.reduce(
    (sum, key) => sum + client.getIn(["attributes", key]) || 0,
    0
  );

export const getClientMainInfo = (client, t) => {
  const gender = client.getIn(["attributes", "gender"]);
  const birthday = client.getIn(["attributes", "birthday"]);
  const yo = birthday && moment().diff(birthday, "years");
  return prepareStringTags([
    gender && t(`clients:gender.${gender}`),
    yo && t("clients:yo", { yo })
  ]);
};

export const getClientBirthday = client => {
  const birthday = client.getIn(["attributes", "birthday"]);
  return birthday ? moment(birthday).format(BIRTHDAY_FORMAT) : null;
};

export const getClientTags = (client, tagsKey) => {
  const tags = client.getIn(["attributes", tagsKey]);
  return tags ? prepareStringTags(tags.split(",")) : [];
};

export const getClientAllergies = client =>
  getClientTags(client, ALLERGIES_KEY);
export const getClientFavouriteFood = client =>
  getClientTags(client, FAVOURITE_FOOD_KEY);
export const getClientFavouriteDrink = client =>
  getClientTags(client, FAVOURITE_DRINK_KEY);

export const getClientDetails = (client, t) =>
  client
    ? {
        avatar: getClientAvatar(client),
        name: client.getIn(["attributes", "name"]),
        mainInfo: getClientMainInfo(client, t),
        personal: {
          phone: getClientPhone(client) || EMPTY_VALUE,
          email: client.getIn(["attributes", "email"]),
          country: client.getIn(["attributes", "country"]),
          birthday: getClientBirthday(client)
        },
        tags: {
          [ALLERGIES_KEY]: getClientAllergies(client),
          [FAVOURITE_FOOD_KEY]: getClientFavouriteFood(client),
          [FAVOURITE_DRINK_KEY]: getClientFavouriteDrink(client)
        },
        budget: {
          [TOTAL_BUDGET_KEY]: getClientTotalBudget(client),
          [BAR_BUDGET_KEY]: client.getIn(["attributes", BAR_BUDGET_KEY]) || 0,
          [RESTAURANTS_BUDGET_KEY]:
            client.getIn(["attributes", RESTAURANTS_BUDGET_KEY]) || 0,
          [DELIVERY_TAKEAWAY_BUDGET_KEY]:
            client.getIn(["attributes", DELIVERY_TAKEAWAY_BUDGET_KEY]) || 0
        },
        acceptedFoodDetective: client.getIn([
          "attributes",
          "acceptedFoodDetective"
        ])
      }
    : {};
