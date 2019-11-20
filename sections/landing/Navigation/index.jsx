import React from "react";
import { Flex, Box } from "@rebass/grid";
import { Paragraph, Button, FoodetectiveLogo } from "components";
import { func, string } from "prop-types";
import uuid from "uuid/v1";
import Cookies from "js-cookie";
import { API_URL, OAUTH_PUBLIC_CLIENT_ID, OAUTH_CALLBACK_URL } from "consts";
import { SectionItem } from "./styled";
import { LogoWrapper, LogoMobileWrapper } from "../sharedStyled";

const navSections = [
  { name: "services", translationKey: "services.header" },
  { name: "industries", translationKey: "cooperations.industries.header" },
  { name: "features", translationKey: "features.header" },
  { name: "widget", translationKey: "widget.navLink" },
  { name: "plans", translationKey: "pricing" }
];

const Navigation = ({ t, lng, scrollTo }) => (
  <Flex
    width={1}
    px={3}
    mt={4}
    as="header"
    alignItems="center"
    style={{
      maxWidth: "1200px"
    }}
  >
    <Box>
      <LogoWrapper>
        <FoodetectiveLogo withTagline />
      </LogoWrapper>
      <LogoMobileWrapper>
        <FoodetectiveLogo />
      </LogoMobileWrapper>
    </Box>
    <Flex
      as="ul"
      flex="1"
      justifyContent="flex-end"
      alignItems="center"
      flexWrap="wrap"
      css={{
        paddingInlineStart: "0"
      }}
    >
      {navSections.map(({ name, translationKey }) => (
        <SectionItem>
          <Paragraph
            onClick={() => {
              scrollTo(name);
            }}
            mb={0}
            style={{
              cursor: "pointer"
            }}
          >
            {t(translationKey)}
          </Paragraph>
        </SectionItem>
      ))}
      <Box mx={1}>
        <Button
          styleName="signIn"
          onClick={() => {
            window.location.href = `${API_URL}users/sign_up?locale=${lng}&plan=basic`;
          }}
        >
          {t("common:signIn")}
        </Button>
      </Box>
      <Box mx={1}>
        <Button
          styleName="login"
          onClick={() => {
            const state = uuid();
            Cookies.set("loginStateParam", state);
            window.location.href = `${API_URL}/oauth/authorize?client_id=${OAUTH_PUBLIC_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URL}&response_type=code&scope=trusted+refresh_token+public&state=${state}`;
          }}
        >
          {t("common:login")}
        </Button>
      </Box>
    </Flex>
  </Flex>
);

Navigation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  scrollTo: func.isRequired
};

export default Navigation;
