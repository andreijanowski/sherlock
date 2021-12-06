import React from "react";
import { Flex, Box } from "@rebass/grid";

import ListItem from "./ListItem";
import { STEPS_ARRAY } from "./utils";

const APIPossibilitiesList = () => (
  <Flex mx={[0, null, null, -3]} flexWrap="wrap">
    {STEPS_ARRAY.map((step, index) => {
      const isLastChild = index === STEPS_ARRAY.length - 1;
      return (
        <Box key={step} px={3} width={[1, null, 1, 1 / 3]}>
          <ListItem step={step} isLastChild={isLastChild} />
        </Box>
      );
    })}
  </Flex>
);

export default APIPossibilitiesList;
