import React from "react";
import { bool } from "prop-types";

import { Link } from "components";
import { useLng } from "utils/hooks";
import { LogoContainer, LogoSmallText } from "./styled";

const FoodetectiveTextLogo = ({ isSmall, isDark }) => {
  const lng = useLng();
  return (
    <Link route="/" lng={lng}>
      <LogoContainer as="a" isSmall={isSmall} isDark={isDark}>
        Foodetective <LogoSmallText> For Business</LogoSmallText>
      </LogoContainer>
    </Link>
  );
};

FoodetectiveTextLogo.propTypes = {
  isSmall: bool,
  isDark: bool
};

FoodetectiveTextLogo.defaultProps = {
  isSmall: false,
  isDark: false
};

export default FoodetectiveTextLogo;
