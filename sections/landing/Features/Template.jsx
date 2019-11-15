import React from "react";
import { Flex, Box } from "@rebass/grid";
import { H2, Button, Paragraph } from "components";
import { func, string } from "prop-types";
import { Screen } from "./Template.styled";

const Template = ({ t, activeNavItem }) => (
  <Flex flexWrap="wrap" m={-2}>
    <Box width={[1, 1 / 2]} p={2}>
      <H2 white>{t(`features.subsections.${activeNavItem}.header`)}</H2>
      <Paragraph white>
        {t(`features.subsections.${activeNavItem}.paragraph`)}
      </Paragraph>
      <Button styleName="white">{t("features.registerForFree")}</Button>
    </Box>
    <Box width={[1, 1 / 2]} p={2}>
      {/* TODO: optimize visibility.png */}
      <Screen activeNavItem={activeNavItem} />
    </Box>
  </Flex>
);

Template.propTypes = {
  t: func.isRequired,
  activeNavItem: string.isRequired
};

export default Template;
