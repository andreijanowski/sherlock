import Switch from "react-switch";
import { Flex, Box } from "@rebass/grid";
import styled from "styled-components";
import { theme } from "utils/theme";
import { func, string } from "prop-types";
import { Option } from "./styled";

const SwitchWrapper = styled(Box)`
  border-radius: 13px;
  padding: 2px;
  height: 26px;
  background: linear-gradient(
    to right,
    rgba(${p => p.theme.colors.dark}, 0.4),
    rgb(${p => p.theme.colors.blue})
  );
`;

const BillingPeriod = ({ t, billingPeriod, handleChangeBillngPeriod }) => (
  <Flex alignItems="center" mb={3}>
    <Option dark mr={3}>
      {t("plans.billingYearly")}
    </Option>
    <SwitchWrapper>
      <Switch
        checked={billingPeriod === "monthly"}
        onChange={handleChangeBillngPeriod}
        uncheckedIcon={false}
        checkedIcon={false}
        handleDiameter={16}
        height={22}
        width={50}
        offHandleColor="#a5a8af"
        onHandleColor="#4a62ff"
        offColor="#f8f9ff"
        onColor="#f8f9ff"
        boxShadow={`0 1px 3px rgba(${theme.colors.blue}, 0.48)`}
        activeBoxShadow={`0 0 0 3px rgba(${theme.colors.blue}, 0.48)`}
      />
    </SwitchWrapper>
    <Option ml={3}>{t("plans.billingMonthly")}</Option>
  </Flex>
);

BillingPeriod.propTypes = {
  t: func.isRequired,
  billingPeriod: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default BillingPeriod;
