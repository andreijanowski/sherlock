import { noop } from "lodash";
import { Flex, Box } from "@rebass/grid";
import { func, string, oneOfType, shape, any } from "prop-types";
import { PlansBillingInterval } from "components";
import PlansTable from "sections/subscriptions/Plans/PlansTable";
import { H2Styled, ParagraphStyled, TextWrapper } from "./styled";
import { BlueText } from "../sharedStyled";

const PlansMainComponent = ({
  t,
  plansRef,
  billingInterval,
  handleChangeBillngPeriod,
  onPlanChoose
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
            <Box width={[1, 1 / 2]} mb={[30, 0]} mr={4}>
              <ParagraphStyled big>
                {t("plans:subHeader.start")}{" "}
                <BlueText>{t("plans:subHeader.end")}</BlueText>
              </ParagraphStyled>
              <ParagraphStyled>{t("plans:paragraph")}</ParagraphStyled>
            </Box>
            <PlansBillingInterval
              {...{ t, billingInterval, handleChangeBillngPeriod }}
            />
          </Flex>
        </Box>
      </Flex>
    </TextWrapper>
    <TextWrapper>
      <PlansTable
        interval={billingInterval}
        t={t}
        onPlanChoose={onPlanChoose}
      />
    </TextWrapper>
  </Flex>
);

PlansMainComponent.defaultProps = {
  onPlanChoose: noop
};
PlansMainComponent.propTypes = {
  t: func.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired,
  plansRef: oneOfType([func, shape({ current: any })]).isRequired,
  onPlanChoose: func
};

export default PlansMainComponent;
