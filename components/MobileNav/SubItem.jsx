import { useState } from "react";
import { Link } from "components";
import { Flex } from "@rebass/grid";
import { arrayOf, shape, func, string, bool } from "prop-types";
import { BackArrow } from "icons";
import { IconWrapper, IconLabel, SubMenuWrapper } from "./styled";

const SubItem = ({ t, lng, route, label, Icon, withSubmenu, submenuItems }) => {
  const [isSubmenuOpen, toggleSubMenu] = useState(false);

  return !withSubmenu ? (
    <Link {...{ lng, route }}>
      <Flex mb={4}>
        <IconWrapper dark>
          <Icon />
        </IconWrapper>
        <IconLabel>{label}</IconLabel>
      </Flex>
    </Link>
  ) : (
    <Flex mb={4} onClick={() => toggleSubMenu(!isSubmenuOpen)}>
      <IconWrapper dark>
        <Icon />
      </IconWrapper>
      <IconLabel>{label}</IconLabel>
      <SubMenuWrapper
        {...{ isSubmenuOpen }}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Flex mb={4} onClick={() => toggleSubMenu(!isSubmenuOpen)}>
          <IconWrapper dark>
            <BackArrow />
          </IconWrapper>
          <IconLabel>{t("app:back")}</IconLabel>
        </Flex>
        {submenuItems &&
          submenuItems.map(item =>
            item.route ? (
              <Link {...{ lng, route: item.route, key: item.label }}>
                <Flex mb={4}>
                  <IconWrapper dark noFill>
                    {item.SubmenuIcon && <item.SubmenuIcon />}
                  </IconWrapper>
                  <IconLabel>{item.label}</IconLabel>
                </Flex>
              </Link>
            ) : (
              <Flex mb={4} key={item.label} onClick={item.onClick}>
                <IconWrapper dark noFill>
                  {item.SubmenuIcon && <item.SubmenuIcon />}
                </IconWrapper>
                <IconLabel>{item.label}</IconLabel>
              </Flex>
            )
          )}
      </SubMenuWrapper>
    </Flex>
  );
};

SubItem.propTypes = {
  lng: string.isRequired,
  route: string,
  label: string.isRequired,
  Icon: func,
  t: func.isRequired,
  withSubmenu: bool,
  submenuItems: arrayOf(shape())
};

SubItem.defaultProps = {
  route: null,
  Icon: null,
  withSubmenu: false,
  submenuItems: null
};

export default SubItem;
