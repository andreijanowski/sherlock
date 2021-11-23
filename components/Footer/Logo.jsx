import React from "react";
import { string } from "prop-types";

import { Link } from "components";
import { LogoContainer, LogoSmallText } from "./styled";

const Logo = ({ lng }) => (
  <Link route="/" lng={lng}>
    <LogoContainer as="a">
      Foodetective <LogoSmallText> For Business</LogoSmallText>
    </LogoContainer>
  </Link>
);

Logo.propTypes = {
  lng: string.isRequired
};

export default Logo;
