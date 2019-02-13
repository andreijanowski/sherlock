import { Flex } from "@rebass/grid";
import { NavBar, MainApp, Menu } from "components";
import { node, bool, func, string, arrayOf, shape } from "prop-types";

const AppLayout = ({
  children,
  withMenu,
  menuItems,
  mainIcon,
  header,
  t,
  lng,
  select
}) => (
  <Flex width={1}>
    <NavBar {...{ t, lng }} />
    {withMenu && <Menu {...{ lng, menuItems, select }} />}
    <MainApp {...{ withMenu, mainIcon, header }}>{children}</MainApp>
  </Flex>
);

AppLayout.propTypes = {
  children: node.isRequired,
  withMenu: bool,
  menuItems: arrayOf(
    shape({
      onClick: func,
      route: string,
      label: string.isRequired,
      isActive: bool.isRequired
    })
  ),
  mainIcon: string,
  header: string,
  t: func.isRequired,
  lng: string.isRequired,
  select: shape()
};

AppLayout.defaultProps = {
  menuItems: null,
  withMenu: false,
  mainIcon: null,
  header: null,
  select: null
};

export default AppLayout;
