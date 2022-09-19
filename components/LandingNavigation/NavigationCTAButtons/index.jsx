import React, { useCallback } from "react";
import { Flex, Box } from "@rebass/grid";
import uuid from "uuid/v1";
import Cookies from "js-cookie";

import { API_URL, OAUTH_PUBLIC_CLIENT_ID, OAUTH_CALLBACK_URL } from "consts";
import { useT } from "utils/hooks";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";

const NavigationCTAButtons = () => {
  const t = useT();

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
    </Flex>
  );
};

export default NavigationCTAButtons;
