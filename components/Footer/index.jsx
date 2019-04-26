import withI18next from "lib/withI18next";
import { func } from "prop-types";
import {
  FoodetectiveLogo
  // uncomment after translations are ready
  // LanguageSwitcher
} from "components";
import { Box } from "@rebass/grid";
import { privacyPolicyLink, termsAndConditionsLink } from "consts";
import {
  FooterWrapper,
  TextWrapper,
  MenuWrapper,
  ColumnTitle,
  CopyrightWrapper,
  CopyrightNote,
  FoodetectiveLogoWrapper
} from "./styled";
import NavigationList from "./navigationList";

const namespaces = ["footer"];

const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <TextWrapper>
        <FoodetectiveLogoWrapper>
          <FoodetectiveLogo />
        </FoodetectiveLogoWrapper>
        <MenuWrapper>
          <Box width={[1 / 2, "auto"]} p={2}>
            <ColumnTitle>{t("navigation.columnOne.title")}</ColumnTitle>
            <NavigationList
              {...{
                t,
                columnName: "columnOne",
                hrefs: {
                  "1": {
                    href: "https://foodetective.typeform.com/to/tzqu8b",
                    target: "_blank",
                    rel: "noreferrer noopener"
                  }
                }
              }}
            />
          </Box>
          <Box width={[1 / 2, "auto"]} p={2}>
            <ColumnTitle>{t("navigation.columnTwo.title")}</ColumnTitle>
            <NavigationList
              {...{
                t,
                columnName: "columnTwo",
                hrefs: {
                  "2": {
                    href: "https://medium.com/@GetSherlockNow",
                    target: "_blank",
                    rel: "noreferrer noopener"
                  }
                }
              }}
            />
          </Box>
          <Box width={[1 / 2, "auto"]} p={2}>
            <ColumnTitle>{t("navigation.columnThree.title")}</ColumnTitle>
            <NavigationList
              {...{
                t,
                columnName: "columnThree",
                hrefs: {
                  "0": {
                    href: privacyPolicyLink,
                    target: "_blank",
                    rel: "noreferrer noopener"
                  },
                  "1": {
                    href: termsAndConditionsLink,
                    target: "_blank",
                    rel: "noreferrer noopener"
                  }
                }
              }}
            />
          </Box>
          <Box width={[1 / 2, "auto"]} p={2}>
            <ColumnTitle>{t("navigation.columnFour.title")}</ColumnTitle>
            <NavigationList
              {...{
                t,
                columnName: "columnFour",
                hrefs: {
                  "0": {
                    href: "https://www.facebook.com/sherlock.foodetective/",
                    target: "_blank",
                    rel: "noreferrer noopener"
                  },
                  "1": {
                    href: "https://www.linkedin.com/company/13981713/",
                    target: "_blank",
                    rel: "noreferrer noopener"
                  },
                  "2": {
                    href: "https://twitter.com/GetSherlockNow",
                    target: "_blank",
                    rel: "noreferrer noopener"
                  },
                  "3": {
                    href: "https://www.instagram.com/sherlock.foodetective.co",
                    target: "_blank",
                    rel: "noreferrer noopener"
                  }
                }
              }}
            />
          </Box>
          {/* hide until we don't have mobile app */}
          {/* <Box>
          <ColumnTitle>{t("navigation.columnFive.title")}</ColumnTitle>
          <nav>
            <ListWrapper>
              <li>
                <NavigationLink href="#">
                  <AppPlatformLogo src="/static/img/applestore.png" />
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href="#">
                  <AppPlatformLogo src="/static/img/googleplay.png" />
                </NavigationLink>
              </li>
            </ListWrapper>
          </nav>
        </Box> */}
        </MenuWrapper>
      </TextWrapper>
      <CopyrightWrapper>
        <CopyrightNote>{t("copyrightNote", { currentYear })}</CopyrightNote>
        {/* uncomment after translations are ready */}
        {/* <LanguageSwitcher withBorder={false} listPosition="top" /> */}
      </CopyrightWrapper>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  t: func.isRequired
};

export default withI18next(namespaces)(Footer);
