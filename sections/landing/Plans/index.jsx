import { Flex, Box } from "@rebass/grid";
import { func, string, oneOfType, shape, any } from "prop-types";
import { PlansLandingPage, PlansBillingInterval } from "components";
import { H2Styled, ParagraphStyled, PlansWrapper, TextWrapper } from "./styled";
import { BlueText } from "../sharedStyled";

const PlansMainComponent = ({
  t,
  plansRef,
  lng,
  billingInterval,
  handleChangeBillngPeriod
}) => (
  <Flex
    ref={plansRef}
    flexDirection="column"
    width={1}
    mb={6}
    mt={[0, 4]}
    px={3}
  >
    <TextWrapper>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        justifyContent={["center", "space-between"]}
        alignItems="flex-end"
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
      </Flex>
      <ParagraphStyled width={[1, 1 / 2]}>
        {t("plans:paragraph")}
      </ParagraphStyled>
    </TextWrapper>
    <PlansWrapper>
      <PlansLandingPage
        {...{
          t,
          lng,
          billingInterval,
          isAuthenticated: false
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
