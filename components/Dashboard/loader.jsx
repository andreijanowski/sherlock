import React from "react";
import { Flex } from "@rebass/grid";
import { PulseLoader } from "react-spinners";
import { theme } from "utils/theme";

const Loader = () => (
  <Flex justifyContent="center">
    <PulseLoader color={`rgb(${theme.colors.blue})`} />
  </Flex>
);

export default Loader;
