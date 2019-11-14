import React from "react";
import { Flex, Box } from "@rebass/grid";
import { Paragraph, Button, FoodetectiveLogo } from "components";
import { Router } from "routes";
import { func, string } from "prop-types";
import { LogoWrapper, LogoMobileWrapper } from "../sharedStyled";

const navSections = [
  { name: "services", translationKey: "services.header" },
  { name: "industries", translationKey: "cooperations.industries.header" },
  { name: "features", translationKey: "features.header" },
  { name: "widget", translationKey: "widget.header" }
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
      flexWrap={["wrap-reverse", "wrap"]}
      css={{
        paddingInlineStart: "0"
      }}
    >
      {navSections.map(({ name, translationKey }) => (
        <Box
          as="li"
          px={3}
          width={[1 / 2, "auto"]}
          css={{
            display: "block"
          }}
        >
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
        </Box>
      ))}
      <Box mx={1}>
        <Button
          styleName="signIn"
          onClick={() => Router.pushRoute(`/${lng}/register/?plan=basic`)}
        >
          {t("common:signIn")}
        </Button>
      </Box>
      <Box mx={1}>
        <Button
          styleName="login"
          onClick={() => Router.pushRoute(`/${lng}/login/`)}
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
