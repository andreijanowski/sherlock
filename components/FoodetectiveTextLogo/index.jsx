import React from "react";
import { bool } from "prop-types";

import { Link } from "components";
import { useLng } from "utils/hooks";
import { LogoContainer, LogoSmallText } from "./styled";

const FoodetectiveTextLogo = ({ isSmall }) => {
  const lng = useLng();
  return (
    <Link route="/" lng={lng}>
      <LogoContainer as="a" isSmall={isSmall}>
        Foodetective <LogoSmallText> For Business</LogoSmallText>
      </LogoContainer>
    </Link>
  );
};

FoodetectiveTextLogo.propTypes = {
  isSmall: bool
};

FoodetectiveTextLogo.defaultProps = {
  isSmall: false
};

export default FoodetectiveTextLogo;
