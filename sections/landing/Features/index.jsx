import React, { useState } from "react";
import { H2 } from "components";
import { func } from "prop-types";
import { FeaturesWrapper } from "./styled";
import Template from "./Template";
import Nav from "./Nav";
import { navItems } from "./Nav.config";
import { LandingWrapper } from "../sharedStyled";

const Features = ({ t }) => {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0]);
  return (
    <FeaturesWrapper>
      <LandingWrapper>
        <H2 white>{t("features.header")}</H2>
        <Nav {...{ t, activeNavItem, setActiveNavItem }} />
        <Template {...{ t, activeNavItem }} />
      </LandingWrapper>
    </FeaturesWrapper>
  );
};

Features.propTypes = {
  t: func.isRequired
};

export default Features;
