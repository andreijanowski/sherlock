import withI18next from "lib/withI18next";
import { func } from "prop-types";
import { FoodetectiveLogo, LanguageSwitcher } from "components";
import { Box } from "@rebass/grid";
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

const Footer = ({ t }) => (
  <FooterWrapper>
    <TextWrapper>
      <FoodetectiveLogoWrapper>
        <FoodetectiveLogo />
      </FoodetectiveLogoWrapper>
      <MenuWrapper>
        <Box width={[1 / 2, "auto"]} p={2}>
          <ColumnTitle>{t("navigation.columnOne.title")}</ColumnTitle>
          <NavigationList {...{ t, columnName: "columnOne" }} />
        </Box>
        <Box width={[1 / 2, "auto"]} p={2}>
          <ColumnTitle>{t("navigation.columnTwo.title")}</ColumnTitle>
          <NavigationList {...{ t, columnName: "columnTwo" }} />
        </Box>
        <Box width={[1 / 2, "auto"]} p={2}>
          <ColumnTitle>{t("navigation.columnThree.title")}</ColumnTitle>
          <NavigationList {...{ t, columnName: "columnThree" }} />
        </Box>
        <Box width={[1 / 2, "auto"]} p={2}>
          <ColumnTitle>{t("navigation.columnFour.title")}</ColumnTitle>
          <NavigationList
            {...{
              t,
              columnName: "columnFour",
              hrefs: [
                "https://www.facebook.com/sherlock.foodetective/",
                "https://www.linkedin.com/company/13981713/",
                "https://twitter.com/GetSherlockNow",
                "https://www.instagram.com/sherlock.foodetective.co"
              ]
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
      <CopyrightNote>{t("copyrightNote")}</CopyrightNote>
      <LanguageSwitcher withBorder={false} listPosition="top" />
    </CopyrightWrapper>
  </FooterWrapper>
);

Footer.propTypes = {
  t: func.isRequired
};

export default withI18next(namespaces)(Footer);
