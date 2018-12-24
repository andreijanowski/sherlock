import { H2, Paragraph } from "components";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { PlansWrapper, TextWrapper } from "./styled";
import Plan from "./plan";
import BillingPeriod from "./billingPeriod";
import PromotionBoard from "./promotionBoard";

const Plans = ({ t, billingPeriod, handleChangeBillngPeriod }) => (
  <Flex flexDirection="column" width={1} mb={6}>
    <TextWrapper>
      <Flex
        flexDirection="row"
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
    <PlansWrapper>
      <Box width={1 / 4}>
        <Plan
          {...{
            t,
            billingPeriod,
            color: "limeade",
            name: "essential"
          }}
        />
      </Box>
      <Box width={1 / 4}>
        <Plan
          {...{
            t,
            billingPeriod,
            color: "deepSkyBlue",
            name: "basic"
          }}
        />
      </Box>
      <Box width={1 / 4}>
        <Plan
          {...{
            t,
            billingPeriod,
            color: "navyBlue",
            name: "premium"
          }}
        />
      </Box>
      <Box width={1 / 4}>
        <Plan
          {...{
            t,
            billingPeriod,
            color: "hanPurple",
            name: "professional"
          }}
        />
      </Box>
    </PlansWrapper>
  </Flex>
);

Plans.propTypes = {
  t: func.isRequired,
  billingPeriod: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default Plans;
