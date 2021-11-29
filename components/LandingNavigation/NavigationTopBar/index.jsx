import React from "react";
import { Flex } from "@rebass/grid";

import FoodetectiveTextLogo from "components/FoodetectiveTextLogo";
import { Container } from "./styled";
import NavigationCTAButtons from "../NavigationCTAButtons";

const NavigationTopBar = () => (
  <Container>
    <Flex>
      <FoodetectiveTextLogo />
    </Flex>
    <Flex justifyContent="flex-end">
      <NavigationCTAButtons />
    </Flex>
  </Container>
);

export default NavigationTopBar;
