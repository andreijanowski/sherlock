import { func, string } from "prop-types";
import { ManagersWrapper, Icon, ManagersText } from "./styled";

const Managers = ({ t, color }) => (
  <ManagersWrapper color={color}>
    <Icon color={color} disabled>
      -
    </Icon>
    <ManagersText color={color}>{t("plans.managers")}</ManagersText>
    <Icon color={color}>+</Icon>
  </ManagersWrapper>
);

Managers.propTypes = {
  t: func.isRequired,
  color: string.isRequired
};

export default Managers;
