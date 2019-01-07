import withI18next from "lib/withI18next";
import { FoodetectiveLogo, LanguageSwitcher } from "components";
import { Box } from "@rebass/grid";
import {
  FooterWrapper,
  TextWrapper,
  MenuWrapper,
  ColumnTitle,
  CopyrightWrapper,
  CopyrightNote,
  ListWrapper,
  NavigationLink,
  AppPlatformLogo
} from "./styled";
import NavigationList from "./navigationList";

const Footer = ({ t }) => (
  <FooterWrapper>
    <TextWrapper>
      <Box width={120}>
        <FoodetectiveLogo {...{ t }} />
      </Box>
      <MenuWrapper>
        <Box>
          <ColumnTitle>{t("navigation.columnOne.title")}</ColumnTitle>
          <NavigationList {...{ t, columnName: "columnOne" }} />
        </Box>
        <Box>
          <ColumnTitle>{t("navigation.columnTwo.title")}</ColumnTitle>
          <NavigationList {...{ t, columnName: "columnTwo" }} />
        </Box>
        <Box>
          <ColumnTitle>{t("navigation.columnThree.title")}</ColumnTitle>
          <NavigationList {...{ t, columnName: "columnThree" }} />
        </Box>
        <Box>
          <ColumnTitle>{t("navigation.columnFour.title")}</ColumnTitle>
          <NavigationList {...{ t, columnName: "columnFour" }} />
        </Box>
        <Box>
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
        </Box>
      </MenuWrapper>
    </TextWrapper>
    <CopyrightWrapper>
      <TextWrapper>
        <CopyrightNote>{t("copyrightNote")}</CopyrightNote>
        <LanguageSwitcher withBorder={false} listPosition="top" />
      </TextWrapper>
    </CopyrightWrapper>
  </FooterWrapper>
);

export default withI18next("footer")(Footer);
