import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { Plans, PlansBillingInterval } from "components";
import { H2Styled, ParagraphStyled, PlansWrapper, TextWrapper } from "./styled";
// import PromotionBoard from "./promotionBoard";

const PlansMainComponent = ({
  t,
  lng,
  billingInterval,
  handleChangeBillngPeriod
}) => (
  <Flex flexDirection="column" width={1} mb={6}>
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
      {/* Hiden for now */}
      {/* <PromotionBoard {...{ t }} /> */}
    </TextWrapper>
    <PlansWrapper>
      <Plans
        {...{
          t,
          lng,
          billingInterval,
          isAuthenticated: false,
          isSubscriptionView: false
        }}
      />
    </PlansWrapper>
  </Flex>
);

PlansMainComponent.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default PlansMainComponent;
