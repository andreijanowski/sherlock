import { Flex } from "@rebass/grid";
import { MainApp, NavigationContainer } from "components";
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
  <Flex flexDirection={["column", "row"]} width={1} id="app">
    <NavigationContainer {...{ t, lng, withMenu, menuItems, select }} />
    <MainApp
      {...{
        withMenu,
        mainIcon,
        header,
        t
      }}
    >
      {children}
    </MainApp>
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
      isActive: bool
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
