import React from "react";
import { func, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";

import { getPlanData } from "utils/plans";
import { Container, Line, Price, Name } from "./styled";

const PlanToPayInfo = ({ t, plan }) => {
  const { price, period, fullName } = getPlanData({ plan, t });

  return (
    <>
      <Container py={3}>
        <Name mb={3}>{fullName}</Name>
        <Flex alignItems="center">
          <Price>{price}</Price>{" "}
          <Box ml={2}>/ {t(`plans:billingPerPeriod.${period}`)}</Box>
        </Flex>
      </Container>
      <Line />
    </>
  );
};

PlanToPayInfo.propTypes = {
  t: func.isRequired,
  plan: shape().isRequired
};

export default PlanToPayInfo;
