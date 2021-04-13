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
  lng
}) => (
  <Flex flexDirection={["column", "row"]} width={1} id="app">
    <NavigationContainer
      t={t}
      lng={lng}
      withMenu={withMenu}
      menuItems={menuItems}
    />
    <MainApp
      withMenu={withMenu}
      mainIcon={mainIcon}
      header={header}
      t={t}
      menuItems={menuItems}
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
  header: node,
  t: func.isRequired,
  lng: string.isRequired
};

AppLayout.defaultProps = {
  menuItems: null,
  withMenu: false,
  mainIcon: null,
  header: null
};

export default AppLayout;
