import {
  apiGuideLink,
  becomePartnerLink,
  mediaKitLink,
  privacyPolicyLink,
  termsAndConditionsLink,
  INVEST_TYPEFORM_LINK,
  LICENSING_TYPEFORM_LINK
} from "consts";

export const getConfig = t => [
  {
    title: t("navigation.columnOne.title"),
    name: "columnOne",
    hrefs: {
      0: {
        href: becomePartnerLink,
        target: "_blank",
        rel: "noreferrer noopener"
      },
      1: {
        href: `mailto:hello@foodetective.co?subject=${t("workInFoodetective")}`,
        target: "_blank",
        rel: "noreferrer noopener"
      },
      2: {
        href: LICENSING_TYPEFORM_LINK,
        target: "_blank",
        rel: "noreferrer noopener"
      },
      3: {
        href: INVEST_TYPEFORM_LINK,
        target: "_blank",
        rel: "noreferrer noopener"
      }
    }
  },
  {
    title: t("navigation.columnTwo.title"),
    name: "columnTwo",
    hrefs: {
      0: {
        href: "https://medium.com/@foodetective",
        target: "_blank",
        rel: "noreferrer noopener"
      },
      1: {
        href: mediaKitLink,
        target: "_blank",
        rel: "noreferrer noopener"
      },
      2: {
        href: apiGuideLink,
        target: "_blank",
        rel: "noreferrer noopener"
      }
    }
  },
  {
    title: t("navigation.columnThree.title"),
    name: "columnThree",
    hrefs: {
      0: {
        href: privacyPolicyLink,
        target: "_blank",
        rel: "noreferrer noopener"
      },
      1: {
        href: termsAndConditionsLink,
        target: "_blank",
        rel: "noreferrer noopener"
      }
    }
  }
];

export const socialsConfig = [
  {
    icon: "/static/img/socials/fb.svg",
    href: "https://www.facebook.com/business.foodetective/"
  },
  {
    icon: "/static/img/socials/in.svg",
    href: "https://www.linkedin.com/company/13981713/"
  },
  {
    icon: "/static/img/socials/tw.svg",
    href: "https://twitter.com/FoodetectivePro"
  },
  {
    icon: "/static/img/socials/ig.svg",
    href: "https://www.instagram.com/business.foodetective.co/"
  },
  {
    icon: "/static/img/socials/yt.svg",
    href: "https://www.youtube.com/channel/UC2MnDoNtpuh5CTbhEtOOGbA/featured"
  }
];
