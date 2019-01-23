import { IconWrapper, Icon } from "./styled";

const ActionIcon = ({ size, icon, ...rest }) => (
  <IconWrapper {...rest}>
    <Icon {...{ size, icon }} />
  </IconWrapper>
);

export default ActionIcon;
