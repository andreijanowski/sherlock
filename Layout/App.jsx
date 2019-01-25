import { Flex } from "@rebass/grid";
import { NavBar, MainApp } from "components";
import { node, bool, func, string } from "prop-types";

const AppLayout = ({
  children,
  withMenu,
  menu,
  mainIcon,
  header,
  t,
  lng,
  slug
}) => (
  <Flex width={1}>
    <NavBar {...{ t, lng, slug }} />
    {withMenu && (
      <Flex ml="1px" width={280}>
        {menu}
      </Flex>
    )}
    <MainApp {...{ withMenu, mainIcon, header }}>{children}</MainApp>
  </Flex>
);

AppLayout.propTypes = {
  children: node.isRequired,
  withMenu: bool,
  menu: node,
  mainIcon: string,
  header: string,
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired
};

AppLayout.defaultProps = {
  menu: null,
  withMenu: false,
  mainIcon: null,
  header: null
};

export default AppLayout;
