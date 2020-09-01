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
  <Flex ref={plansRef} flexDirection="column" width={1} mt={[40, 80]} px={3}>
    <TextWrapper>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        justifyContent={["center", "space-between"]}
        alignItems="flex-end"
      >
        <Box width={[1, "auto"]}>
          <H2Styled>{t("plans:header")}</H2Styled>
          <Flex
            alignItems="flex-start"
            flexDirection={["column", "row"]}
            justifyContent={["center", "space-between"]}
            mb={[20, 10]}
          >
            <ParagraphStyled width={[1, 1 / 2]} mr={4}>
              {t("plans:subHeader.start")}{" "}
              <BlueText>{t("plans:subHeader.end")}</BlueText>
              {t("plans:paragraph")}
            </ParagraphStyled>
            <PlansBillingInterval
              {...{ t, billingInterval, handleChangeBillngPeriod }}
            />
          </Flex>
        </Box>
      </Flex>
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
