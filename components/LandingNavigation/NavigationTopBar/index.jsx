import React, { useCallback, useMemo } from "react";
import { Flex } from "@rebass/grid";

import { FOODETECTIVE_URL } from "consts";
import ButtonsBar from "components/styleguide/ButtonsBar";
import FoodetectiveTextLogo from "components/FoodetectiveTextLogo";
import { useTranslation } from "i18n";
import { Container } from "./styled";
import { getOptions, PROJECT_NAME } from "./utils";
import NavigationCTAButtons from "../NavigationCTAButtons";

const NavigationTopBar = () => {
  const { t } = useTranslation();
  const options = useMemo(() => getOptions(t), [t]);

  const redirectToLefood = useCallback(() => {
    window.location.href = FOODETECTIVE_URL;
  }, []);

  return (
    <Container>
      <Flex>
        <FoodetectiveTextLogo />
      </Flex>
      <Flex justifyContent="center">
        <ButtonsBar
          items={options}
          onChange={redirectToLefood}
          value={PROJECT_NAME.BUSINESS}
        />
      </Flex>
      <Flex justifyContent="flex-end">
        <NavigationCTAButtons />
      </Flex>
    </Container>
  );
};

export default NavigationTopBar;
