import React from "react";
import { Flex, Box } from "@rebass/grid";

import { DEFAULT_PLAN_NAME } from "consts";
import { getPlanLoginPath } from "utils/plans";
import { useLng, useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";

const NavigationCTAButtons = () => {
  const t = useT();
  const lng = useLng();
  return (
    <Flex alignItems="center">
      <Box mr={2}>
        <Button
          as="a"
          href={getPlanLoginPath({ lng, name: DEFAULT_PLAN_NAME })}
          variant={BUTTON_VARIANT.SECONDARY}
        >
          {t("landing:loginAndRegister")}
        </Button>
      </Box>
      <Button as="a" href={`/${lng}/#app`}>
        {t("landing:getTheApp")}
      </Button>
    </Flex>
  );
};

NavigationCTAButtons.propTypes = {};

export default NavigationCTAButtons;
