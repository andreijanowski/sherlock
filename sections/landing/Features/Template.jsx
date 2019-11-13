import React from "react";
import { Flex, Box } from "@rebass/grid";
import { H2, Button, Paragraph } from "components";
import { func, string } from "prop-types";

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
      {/* TODO: replace a placeholder, create a separate component */}
      <img
        width="100%"
        src="/static/img/features/placeholder.png"
        alt="Feature"
      />
    </Box>
  </Flex>
);

Template.propTypes = {
  t: func.isRequired,
  activeNavItem: string.isRequired
};

export default Template;
