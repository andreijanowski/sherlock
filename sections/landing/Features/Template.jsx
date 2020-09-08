import React from "react";
import { Flex, Box } from "@rebass/grid";
import { H2, Button, Paragraph } from "components";
import { func, string } from "prop-types";
import { API_URL, APP_URL } from "consts";
import { Screen, DescriptionWrapper } from "./Template.styled";

const Template = ({ t, lng, activeNavItem }) => (
  <Flex flexWrap="wrap" m={-2}>
    <DescriptionWrapper>
      <H2>{t(`features.subsections.${activeNavItem}.header`)}</H2>
      <Paragraph>
        {t(`features.subsections.${activeNavItem}.paragraph`)}
      </Paragraph>
      <Flex flex={1} alignItems="flex-end">
        <Button
          onClick={() => {
            window.location.href = `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=essential`;
          }}
          styleName="blue"
        >
          {t("features.registerForFree")}
        </Button>
      </Flex>
    </DescriptionWrapper>
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
