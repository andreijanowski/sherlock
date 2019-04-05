import React from "react";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { Plans, PlansBillingPeriod } from "components";
import { H2Styled, ParagraphStyled, PlansWrapper, TextWrapper } from "./styled";
// import PromotionBoard from "./promotionBoard";

const PlansMainComponent = React.forwardRef(
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
            <H2Styled>{t("plans:header")}</H2Styled>
          </Box>
          <PlansBillingPeriod
            {...{ t, billingPeriod, handleChangeBillngPeriod }}
          />
          <Box />
        </Flex>
        <ParagraphStyled>{t("plans:paragraph")}</ParagraphStyled>
        {/* Hiden for now */}
        {/* <PromotionBoard {...{ t }} /> */}
      </TextWrapper>
      <PlansWrapper ref={ref}>
        <Plans {...{ t, lng, billingPeriod, isAuthenticated: false }} />
      </PlansWrapper>
    </Flex>
  )
);

PlansMainComponent.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingPeriod: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default PlansMainComponent;
