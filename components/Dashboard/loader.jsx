import React from "react";
import { Flex } from "@rebass/grid";
import { PulseLoader } from "react-spinners";

const Loader = () => (
  <Flex justifyContent="center">
    <PulseLoader />
  </Flex>
);

export default Loader;
