import React, { PureComponent } from "react";
import { Link } from "components";
import { Flex } from "@rebass/grid";
import { shape, node, string, bool } from "prop-types";
import { BackArrow } from "icons";
import { IconWrapper, IconLabel, SubMenuWrapper } from "./styled";

class SubItem extends PureComponent {
  state = {
    isSubmenuOpen: false
  };

  toggleSubMenu = () => {
    this.setState(prevState => ({
      isSubmenuOpen: !prevState.isSubmenuOpen
    }));
  };

  render() {
    const {
      t,
      lng,
      route,
      label,
      Icon,
      withSubmenu,
      submenuItems
    } = this.props;
    const { isSubmenuOpen } = this.state;
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
      <Flex mb={4} onClick={this.toggleSubMenu}>
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
          <Flex mb={4} onClick={this.toggleSubMenu}>
            <IconWrapper dark>
              <BackArrow />
            </IconWrapper>
            <IconLabel>{t("app:back")}</IconLabel>
          </Flex>
          {submenuItems.map(item => (
            <Link {...{ lng, route: item.route }}>
              <Flex mb={4}>
                <IconWrapper dark noFill>
                  {item.SubmenuIcon && <item.SubmenuIcon />}
                </IconWrapper>
                <IconLabel>{item.label}</IconLabel>
              </Flex>
            </Link>
          ))}
        </SubMenuWrapper>
      </Flex>
    );
  }
}

SubItem.propTypes = {
  lng: string.isRequired,
  route: string,
  label: string.isRequired,
  Icon: node,
  t: shape().isRequired,
  withSubmenu: bool,
  submenuItems: shape()
};

SubItem.defaultProps = {
  route: null,
  Icon: null,
  withSubmenu: false,
  submenuItems: null
};

export default SubItem;
