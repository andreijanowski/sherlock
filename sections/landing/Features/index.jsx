import React, { useState } from "react";
import { H2 } from "components";
import { func, oneOfType, shape, any, string } from "prop-types";
import { FeaturesWrapper } from "./styled";
import Template from "./Template";
import Nav from "./Nav";
import { navItems } from "./Nav.config";
import { LandingWrapper } from "../sharedStyled";

const Features = ({ t, lng, featuresRef }) => {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0]);
  return (
    <FeaturesWrapper>
      <LandingWrapper>
        <H2 ref={featuresRef} white>
          {t("features.header")}
        </H2>
        <Nav {...{ t, activeNavItem, setActiveNavItem }} />
        <Template {...{ t, lng, activeNavItem }} />
      </LandingWrapper>
    </FeaturesWrapper>
  );
};

Features.propTypes = {
  t: func.isRequired,
  featuresRef: oneOfType([func, shape({ current: any })]).isRequired,
  lng: string.isRequired
};

export default Features;
