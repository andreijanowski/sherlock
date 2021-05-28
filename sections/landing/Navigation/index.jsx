import React from "react";
import { Flex, Box } from "@rebass/grid";
import { Button, LanguageSwitcher } from "components";
import { func, string } from "prop-types";
import uuid from "uuid/v1";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  API_URL,
  APP_URL,
  OAUTH_PUBLIC_CLIENT_ID,
  OAUTH_CALLBACK_URL
} from "consts";
import {
  SectionItem,
  StyledParagraph,
  StyledHeaderParagraph,
  StyledNavigationLink
} from "./styled";

const navSections = [
  { name: "services", translationKey: "services.header" },
  { name: "developersAndApi", translationKey: "developersAndApi.header" },
  { name: "features", translationKey: "features.header" },
  { name: "plans", translationKey: "pricing" }
];

const Navigation = ({ t, lng, scrollTo }) => (
  <Flex
    width={1}
    as="header"
    alignItems="flex-start"
    flexDirection="column"
    mt={0}
  >
    <Flex css={{ width: "100%", margin: "0" }} justifyContent="center">
      <Flex
        justifyContent="space-between"
        width={1150}
        alignItems="center"
        px={3}
        mt={25}
      >
        <Flex
          as="ul"
          width={1}
          css={{
            paddingInlineStart: "0",
            color: "white"
          }}
        >
          <StyledNavigationLink
            onClick={() => {
              window.location.href = "http://foodetective.co";
            }}
          >
            {t("common:personal")}
          </StyledNavigationLink>
          <StyledNavigationLink active>
            {t("common:business")}
          </StyledNavigationLink>
        </Flex>
        <LanguageSwitcher />
      </Flex>
    </Flex>
    <Flex
      width={1}
      flexDirection={["column", "row"]}
      justifyContent="space-between"
      alignItems="center"
      alignSelf="center"
      mt={[20, 0]}
      px={3}
      css={{
        maxWidth: "1150px"
      }}
    >
      <StyledHeaderParagraph>
        Foodetective <span> For Business</span>
      </StyledHeaderParagraph>

      <Flex
        as="ul"
        width={1}
        justifyContent="center"
        alignItems="flex-start"
        flexWrap="wrap"
        m={0}
        css={{
          paddingInlineStart: "0",
          color: "white"
        }}
      >
        {navSections.map(({ name, translationKey }) => (
          <SectionItem key={name}>
            <StyledParagraph
              onClick={() => {
                scrollTo(name);
              }}
            >
              {t(translationKey)}
            </StyledParagraph>
          </SectionItem>
        ))}
      </Flex>
      <Flex flexDirection="row" justifyContent="flex-end">
        <Box p={[2, 2]} height={40}>
          <Button
            styleName="login"
            onClick={() => {
              const state = uuid();
              Cookies.set("loginStateParam", state);
              window.location.href = `${API_URL}/oauth/authorize?client_id=${OAUTH_PUBLIC_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URL}&response_type=code&scope=trusted+refresh_token+public&state=${state}`;
            }}
          >
            {t("common:login")}
            <FontAwesomeIcon
              icon={["fa", "chevron-right"]}
              style={{ marginLeft: 8 }}
            />
          </Button>
        </Box>
        <Box py={2} pr={0} pl={2} height={40}>
          <Button
            styleName="signUp"
            onClick={() => {
              window.location.href = `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=essential`;
            }}
          >
            {t("common:signUp")}
          </Button>
        </Box>
      </Flex>
    </Flex>
  </Flex>
);

Navigation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  scrollTo: func.isRequired
};

export default Navigation;
