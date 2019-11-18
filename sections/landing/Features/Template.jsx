import React from "react";
import { Flex, Box } from "@rebass/grid";
import { H2, Button, Paragraph } from "components";
import { func, string } from "prop-types";
import { Router } from "routes";
import { Screen } from "./Template.styled";

const Template = ({ t, lng, activeNavItem }) => (
  <Flex flexWrap="wrap" m={-2}>
    <Box flex={1} width={[1, 1 / 2]} p={2}>
      <H2 white>{t(`features.subsections.${activeNavItem}.header`)}</H2>
      <Paragraph white>
        {t(`features.subsections.${activeNavItem}.paragraph`)}
      </Paragraph>
      <Button
        onClick={() => Router.pushRoute(`/${lng}/register/?plan=basic`)}
        styleName="white"
      >
        {t("features.registerForFree")}
      </Button>
    </Box>
    <Box
      width={[1]}
      m={2}
      css={{
        maxWidth: "512px"
      }}
    >
      <Screen activeNavItem={activeNavItem} />
    </Box>
  </Flex>
);

Template.propTypes = {
  t: func.isRequired,
  activeNavItem: string.isRequired,
  lng: string.isRequired
};

export default Template;
