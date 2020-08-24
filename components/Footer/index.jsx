import { withTranslation } from "i18n";
import { func } from "prop-types";
import { FoodetectiveLogo } from "components";
import { privacyPolicyLink, termsAndConditionsLink } from "consts";
import {
  FooterWrapper,
  MenuWrapper,
  ColumnTitle,
  FoodetectiveLogoWrapper,
  NavItem
} from "./styled";
import NavigationList from "./navigationList";

const namespaces = ["footer"];

const Footer = ({ t }) => (
  // const currentYear = new Date().getFullYear();
  <FooterWrapper width={["auto", 1150]}>
    <FoodetectiveLogoWrapper>
      <FoodetectiveLogo />
    </FoodetectiveLogoWrapper>
    <MenuWrapper flexDirection={["column", "row"]}>
      <NavItem width={1} p={2}>
        <ColumnTitle>{t("navigation.columnOne.title")}</ColumnTitle>
        <NavigationList
          {...{
            t,
            columnName: "columnOne",
            hrefs: {
              "0": {
                href: "https://foodetective.typeform.com/to/tzqu8b",
                target: "_blank",
                rel: "noreferrer noopener"
              }
            }
          }}
        />
      </NavItem>
      <NavItem width={1} p={2}>
        <ColumnTitle>{t("navigation.columnTwo.title")}</ColumnTitle>
        <NavigationList
          {...{
            t,
            columnName: "columnTwo",
            hrefs: {
              "0": {
                href: "https://medium.com/@GetSherlockNow",
                target: "_blank",
                rel: "noreferrer noopener"
              }
            }
          }}
        />
      </NavItem>
      <NavItem width={1} p={2}>
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
      </NavItem>
      <NavItem width={1} p={2}>
        <ColumnTitle>{t("navigation.columnFour.title")}</ColumnTitle>
        <NavigationList
          {...{
            t,
            columnName: "columnFour",
            hrefs: {
              "0": {
                href: "https://www.facebook.com/business.foodetective/",
                target: "_blank",
                rel: "noreferrer noopener"
              },
              "1": {
                href: "https://www.linkedin.com/company/13981713/",
                target: "_blank",
                rel: "noreferrer noopener"
              },
              "2": {
                href: "https://twitter.com/FoodetectivePro",
                target: "_blank",
                rel: "noreferrer noopener"
              },
              "3": {
                href: "https://www.instagram.com/business.foodetective/",
                target: "_blank",
                rel: "noreferrer noopener"
              }
            }
          }}
        />
      </NavItem>
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
    {/* <CopyrightWrapper>
        <CopyrightNote>{t("copyrightNote", { currentYear })}</CopyrightNote>
        <LanguageSwitcher withBorder={false} listPosition="top" />
      </CopyrightWrapper> */}
  </FooterWrapper>
);
Footer.propTypes = {
  t: func.isRequired
};

export default withTranslation(namespaces)(Footer);
