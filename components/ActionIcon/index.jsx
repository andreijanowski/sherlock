import { string, arrayOf } from "prop-types";
import { IconWrapper, Icon } from "./styled";

const ActionIcon = ({ size, icon, ...rest }) => (
  <IconWrapper {...rest}>
    <Icon {...{ size, icon }} />
  </IconWrapper>
);

ActionIcon.propTypes = {
  size: string.isRequired,
  icon: arrayOf(string).isRequired
};

export default ActionIcon;
