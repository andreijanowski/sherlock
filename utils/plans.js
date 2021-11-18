import {
  API_URL,
  APP_URL,
  SUBSCRIPTION_ENTREPRISE_URL,
  SUBSCRIPTION_PLANS
} from "consts";
import { theme } from "./theme";

export const getPlanSlug = ({ name, period, currency }) =>
  `sherlock-${name}-${period}-${currency}-v2`;

export const matchPlanBySlug = ({ plans, name, period, currency }) => {
  const planSlug = getPlanSlug({
    name: name.toLowerCase(),
    period,
    currency
  });

  return plans && plans.find(p => p.getIn(["attributes", "slug"]) === planSlug);
};

export const getPlanLoginPath = ({ lng, name }) => {
  if (name === SUBSCRIPTION_PLANS.ULTIMATE) {
    return SUBSCRIPTION_ENTREPRISE_URL;
  }
  return `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=${name}`;
};

const PLANS_COLORS = {
  [SUBSCRIPTION_PLANS.BASIC]: theme.colors.darkText,
  [SUBSCRIPTION_PLANS.ESSENTIAL]: theme.colors.plansCaptionBlue,
  [SUBSCRIPTION_PLANS.ULTIMATE]: theme.colors.textDarkBlue
};

export const formatPlanPrice = ({ cents, currency, t }) => {
  const preparedCents = cents / 100;
  const preparedCurrency = currency.toLocaleLowerCase();
  return `${t(`plans:currency.${preparedCurrency}`)}${preparedCents.toFixed(
    0
  )}`;
};

export const getPlanData = ({ plan, t }) => {
  const slug = plan.getIn(["attributes", "slug"]);
  const cents = plan.getIn(["attributes", "amountCents"]);
  const currency = plan.getIn(["attributes", "currency"]);
  const fullName = plan.getIn(["attributes", "name"]);

  const splittedSlug = slug.split("-");
  const name = splittedSlug[1].toLocaleLowerCase();
  const period = splittedSlug[2];
  const label = t(`plans:plansTitle.${name}`);
  const price = formatPlanPrice({ cents, currency, t });
  const buttonLabel =
    name === SUBSCRIPTION_PLANS.ULTIMATE
      ? t("plans:contactUs")
      : t("plans:choosePlan", { name: label });
  const isPopular = name === SUBSCRIPTION_PLANS.ESSENTIAL;
  const color = PLANS_COLORS[name] || "#000";

  return {
    name,
    fullName,
    period,
    slug,
    label,
    price,
    buttonLabel,
    color,
    isPopular
  };
};
