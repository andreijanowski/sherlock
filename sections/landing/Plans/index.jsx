import { H2, Paragraph } from "components";
import { Flex, Box } from "@rebass/grid";
import { PlansWrapper, TextWrapper } from "./styled";
import Plan from "./plan";
import BillingPeriod from "./billingPeriod";

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
    </TextWrapper>
    <PlansWrapper>
      <Box width={1 / 4}>
        <Plan
          {...{
            t,
            billingPeriod,
            color: "orange",
            name: "starter"
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

export default Plans;
