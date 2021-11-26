import React from "react";
import { Box } from "@rebass/grid";

import { NavigationList, NavigationTopBar } from "components/LandingNavigation";

export const SECTION_IDS = {
  SERVICES: "services",
  DEVELOPERS_AND_API: "developersAndApi",
  FEATURES: "features"
};

const Navigation = () => (
  <Box width={1} as="header" mt={0} py="48px">
    <NavigationTopBar />
    <NavigationList />
  </Box>
);

export default Navigation;
