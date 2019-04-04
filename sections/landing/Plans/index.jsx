import React from "react";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { Plans, PlansBillingInterval } from "components";
import { H2Styled, ParagraphStyled, PlansWrapper, TextWrapper } from "./styled";
import PromotionBoard from "./promotionBoard";

const PlansMainComponent = React.forwardRef(
  ({ t, lng, billingInterval, handleChangeBillngPeriod }, ref) => (
    <Flex flexDirection="column" width={1} mb={6} px={3}>
      <TextWrapper>
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          justifyContent={["center", "space-between"]}
          alignItems="center"
        >
          <Box width={[1, "auto"]}>
            <H2Styled>{t("plans:header")}</H2Styled>
          </Box>
          <PlansBillingInterval
            {...{ t, billingInterval, handleChangeBillngPeriod }}
          />
          <Box />
        </Flex>
        <ParagraphStyled>{t("plans:paragraph")}</ParagraphStyled>
        <PromotionBoard {...{ t }} />
      </TextWrapper>
      <PlansWrapper ref={ref}>
        <Plans {...{ t, lng, billingInterval, isAuthenticated: false }} />
      </PlansWrapper>
    </Flex>
  )
);

PlansMainComponent.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default PlansMainComponent;
