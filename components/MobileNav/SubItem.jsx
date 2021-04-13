import { useState } from "react";
import { Link } from "components";
import { Flex } from "@rebass/grid";
import { arrayOf, shape, func, string, bool } from "prop-types";
import { BackArrow } from "icons";
import { IconWrapper, IconLabel, SubMenuWrapper } from "./styled";

const SubItem = ({
  t,
  lng,
  route,
  label,
  Icon,
  withSubmenu,
  submenuItems,
  toggleMenu
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  return !withSubmenu ? (
    <Link {...{ lng, route }}>
      <Flex align="center">
        <IconWrapper dark>
          <Icon />
        </IconWrapper>
        <IconLabel>{label}</IconLabel>
      </Flex>
    </Link>
  ) : (
    <Flex
      align="center"
      onClick={() => setIsSubmenuOpen(prevIsSubmenuOpen => !prevIsSubmenuOpen)}
    >
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
        <Flex
          align="center"
          onClick={() =>
            setIsSubmenuOpen(prevIsSubmenuOpen => !prevIsSubmenuOpen)
          }
        >
          <IconWrapper dark>
            <BackArrow />
          </IconWrapper>
          <IconLabel>{t("app:back")}</IconLabel>
        </Flex>
        {submenuItems &&
          submenuItems.map(item =>
            item.route ? (
              <Link {...{ lng, route: item.route, key: item.label }}>
                <Flex align="center" onClick={() => toggleMenu(false)}>
                  <IconWrapper dark noFill>
                    {item.SubmenuIcon && <item.SubmenuIcon />}
                  </IconWrapper>
                  <IconLabel>{item.label}</IconLabel>
                </Flex>
              </Link>
            ) : (
              <Flex align="center" key={item.label} onClick={item.onClick}>
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
  submenuItems: arrayOf(shape()),
  toggleMenu: func
};

SubItem.defaultProps = {
  route: null,
  Icon: null,
  withSubmenu: false,
  submenuItems: null,
  toggleMenu: () => null
};

export default SubItem;
