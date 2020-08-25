import Switch from "react-switch";
import { Flex } from "@rebass/grid";
import { theme } from "utils/theme";
import { func, string } from "prop-types";
import { Option, SwitchWrapper } from "./styled";

const BillingInterval = ({ t, billingInterval, handleChangeBillngPeriod }) => {
  const checked = billingInterval === "month";
  return (
    <Flex alignItems="center" mb={3}>
      <Option dark={checked} mr={3}>
        {t("plans:billingYearly")}
      </Option>
      <SwitchWrapper>
        <Switch
          checked={checked}
          onChange={handleChangeBillngPeriod}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={21}
          height={31}
          width={80}
          offHandleColor="#a5a8af"
          onHandleColor="#000000"
          offColor="#f8f9ff"
          onColor="#f8f9ff"
          boxShadow={`0 1px 3px rgba(${theme.colors.blue}, 0.48)`}
          activeBoxShadow={`0 0 0 3px rgba(${theme.colors.blue}, 0.48)`}
        />
      </SwitchWrapper>
      <Option dark={!checked} ml={3}>
        {t("plans:billingMonthly")}
      </Option>
    </Flex>
  );
};

BillingInterval.propTypes = {
  t: func.isRequired,
  billingInterval: string.isRequired,
  handleChangeBillngPeriod: func.isRequired
};

export default BillingInterval;
