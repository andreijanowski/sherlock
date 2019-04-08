import Switch from "react-switch";
import { Flex } from "@rebass/grid";
import { theme } from "utils/theme";
import { func, string } from "prop-types";
import { Option, SwitchWrapper } from "./styled";

const BillingInterval = ({ t, billingInterval, handleChangeBillngPeriod }) => (
  <Flex alignItems="center" mb={3}>
    <Option dark mr={3}>
      {t("plans:billingYearly")}
    </Option>
    <SwitchWrapper>
      <Switch
        checked={billingInterval === "month"}
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
    <Option ml={3}>{t("plans:billingMonthly")}</Option>
  </Flex>
);

BillingInterval.propTypes = {
  t: func.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default BillingInterval;
