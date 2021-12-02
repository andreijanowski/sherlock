import React, { useCallback } from "react";
import { Flex, Box } from "@rebass/grid";
import uuid from "uuid/v1";
import Cookies from "js-cookie";

import { API_URL, OAUTH_PUBLIC_CLIENT_ID, OAUTH_CALLBACK_URL } from "consts";
import { useLng, useT, useWindowWidthLessThen } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { emToPx, theme } from "utils/theme";

const NavigationCTAButtons = () => {
  const t = useT();
  const lng = useLng();

  const isTablet = useWindowWidthLessThen(emToPx(theme.breakpoints[2]));

  const onLoginButtonClick = useCallback(() => {
    const state = uuid();
    Cookies.set("loginStateParam", state, { expires: 7 });
    window.location.href = `${API_URL}/oauth/authorize?client_id=${OAUTH_PUBLIC_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URL}&response_type=code&scope=trusted+refresh_token+public&state=${state}`;
  }, []);

  return (
    <Flex alignItems="center">
      <Box mr={2}>
        <Button onClick={onLoginButtonClick} variant={BUTTON_VARIANT.SECONDARY}>
          {t("landing:loginAndRegister")}
        </Button>
      </Box>
      <Button
        as="a"
        variant={isTablet ? BUTTON_VARIANT.OUTLINE : BUTTON_VARIANT.PRIMARY}
        href={`/${lng}/#app`}
      >
        {t("landing:getTheApp")}
      </Button>
    </Flex>
  );
};

NavigationCTAButtons.propTypes = {};

export default NavigationCTAButtons;
