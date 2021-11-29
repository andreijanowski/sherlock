import React from "react";
import { Flex, Box } from "@rebass/grid";

import ListItem from "./ListItem";

const steps = ["connect", "manage", "analyze"];

const APIPossibilitiesList = () => (
  <Flex mx={-3}>
    {steps.map(step => (
      <Box key={step} px={3} width={[1, 1, 1 / 3]}>
        <ListItem step={step} />
      </Box>
    ))}
  </Flex>
);

export default APIPossibilitiesList;
