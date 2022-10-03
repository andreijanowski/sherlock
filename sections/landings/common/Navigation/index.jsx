import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { NavigationList, NavigationTopBar } from "components/LandingNavigation";
import { useWindowWidthLessThen } from "utils/hooks";
import { emToPx, theme } from "utils/theme";
import { Header } from "./styled";

const Navigation = () => {
  const { asPath } = useRouter();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onBurgerClick = useCallback(() => {
    setIsMenuOpened(prevIsOpened => !prevIsOpened);
  }, []);

  const hideMenu = useCallback(() => {
    setIsMenuOpened(false);
  }, []);

  const isTablet = useWindowWidthLessThen(emToPx(theme.breakpoints[2]));

  useEffect(() => {
    if (!isTablet) {
      setIsMenuOpened(false);
    }
  }, [isTablet]);

  useEffect(() => {
    setIsMenuOpened(false);
  }, [asPath]);

  return (
    <Header py={[0, null, null, 48]} isMenuOpened={isMenuOpened}>
      <NavigationTopBar
        isMenuOpened={isMenuOpened}
        onBurgerClick={onBurgerClick}
        hideMenu={hideMenu}
        isTablet={isTablet}
      />
      {isTablet && (
        <NavigationList isMenuOpened={isMenuOpened} hideMenu={hideMenu} />
      )}
    </Header>
  );
};

export default Navigation;
