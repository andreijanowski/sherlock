import React from "react";
import { Router } from "routes";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { PlansWrapper, TextWrapper } from "./styled";
import { H2Styled, ParagraphStyled } from "../sharedStyled";
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
          justifyContent={["center", "space-between"]}
          alignItems="center"
        >
          <Box width={[1, "auto"]}>
            <H2Styled>{t("plans.header")}</H2Styled>
          </Box>
          <BillingPeriod {...{ t, billingPeriod, handleChangeBillngPeriod }} />
          <Box />
        </Flex>
        <ParagraphStyled>{t("plans.paragraph")}</ParagraphStyled>
        <PromotionBoard {...{ t }} />
      </TextWrapper>
      <PlansWrapper ref={ref}>
        <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
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
        <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
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
        <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
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
        <Box mb={[40, 0]} width={[1, 1 / 2, 1 / 4]}>
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
