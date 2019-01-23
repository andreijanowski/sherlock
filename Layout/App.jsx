import { PureComponent } from "react";
import { Flex } from "@rebass/grid";
import { NavBar, MainApp } from "components";

class AppLayout extends PureComponent {
  render() {
    const {
      children,
      withMenu,
      menu,
      mainIcon,
      header,
      t,
      lng,
      slug
    } = this.props;
    return (
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
  }
}

export default AppLayout;
