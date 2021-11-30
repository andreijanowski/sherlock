import React from "react";
import { Box } from "@rebass/grid";

import { NavigationList, NavigationTopBar } from "components/LandingNavigation";

const Navigation = () => (
  <Box width={1} as="header" mt={0} py="48px">
    <NavigationTopBar />
    <NavigationList />
  </Box>
);

export default Navigation;
