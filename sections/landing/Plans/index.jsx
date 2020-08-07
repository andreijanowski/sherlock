import { Flex, Box } from "@rebass/grid";
import { func, string, oneOfType, shape, any } from "prop-types";
import { Plans, PlansBillingInterval } from "components";
import { H2Styled, ParagraphStyled, PlansWrapper, TextWrapper } from "./styled";
import { BlueText } from "../sharedStyled";

const PlansMainComponent = ({
  t,
  plansRef,
  lng,
  billingInterval,
  handleChangeBillngPeriod
}) => (
  <Flex ref={plansRef} flexDirection="column" width={1} mb={6} mt={[0, 4]}>
    <TextWrapper>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        justifyContent={["center", "space-between"]}
        alignItems="center"
      >
        <Box width={[1, "auto"]}>
          <H2Styled>{t("plans:header")}</H2Styled>
          <H2Styled>
            {t("plans:subHeader.start")}{" "}
            <BlueText>{t("plans:subHeader.end")}</BlueText>
          </H2Styled>
        </Box>
        <PlansBillingInterval
          {...{ t, billingInterval, handleChangeBillngPeriod }}
        />
        <Box />
      </Flex>
      <ParagraphStyled>{t("plans:paragraph")}</ParagraphStyled>
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
  handleChangeBillngPeriod: func.isRequired,
  plansRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default PlansMainComponent;
