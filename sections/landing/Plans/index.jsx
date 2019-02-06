import React from "react";
import { Router } from "routes";
import { H2, Paragraph } from "components";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { PlansWrapper, TextWrapper } from "./styled";
import Plan from "./plan";
import BillingPeriod from "./billingPeriod";
import PromotionBoard from "./promotionBoard";

const Plans = React.forwardRef(
  ({ t, lng, billingPeriod, handleChangeBillngPeriod }, ref) => (
    <Flex flexDirection="column" width={1} mb={6} px={3}>
      <TextWrapper>
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <H2>{t("plans.header")}</H2>
          <BillingPeriod {...{ t, billingPeriod, handleChangeBillngPeriod }} />
          <Box />
        </Flex>
        <Paragraph>{t("plans.paragraph")}</Paragraph>
        <PromotionBoard {...{ t }} />
      </TextWrapper>
      <PlansWrapper ref={ref}>
        <Box width={[1, 1 / 2, 1 / 4]}>
          <Plan
            {...{
              t,
              billingPeriod,
              color: "limeade",
              name: "essential",
              onClickActionButton: () => Router.pushRoute(`/${lng}/register/`)
            }}
          />
        </Box>
        <Box width={[1, 1 / 2, 1 / 4]}>
          <Plan
            {...{
              t,
              billingPeriod,
              color: "deepSkyBlue",
              name: "basic",
              onClickActionButton: () => Router.pushRoute(`/${lng}/register/`)
            }}
          />
        </Box>
        <Box width={[1, 1 / 2, 1 / 4]}>
          <Plan
            {...{
              t,
              billingPeriod,
              color: "navyBlue",
              name: "premium",
              onClickActionButton: () => Router.pushRoute(`/${lng}/register/`)
            }}
          />
        </Box>
        <Box width={[1, 1 / 2, 1 / 4]}>
          <Plan
            {...{
              t,
              billingPeriod,
              color: "hanPurple",
              name: "professional",
              onClickActionButton: () => {}
            }}
          />
        </Box>
      </PlansWrapper>
    </Flex>
  )
);

Plans.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingPeriod: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default Plans;
