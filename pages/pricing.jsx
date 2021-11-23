import React from "react";
import requireAuth from "lib/requireAuth";
import { compose } from "redux";
import { func, shape, string } from "prop-types";

import { Footer } from "components";
import { withTranslation } from "i18n";
import {
  FooterWrapper,
  GetReadyWrapper,
  LandingWrapper,
  NavigationWrapper,
  PlansWrapper
} from "sections/common/sharedStyled";
import { GetReady, Plans } from "sections/pricing";
import Navigation from "sections/common/Navigation";

const namespaces = ["landing", "plans", "common"];

const Pricing = ({ i18n, t }) => {
  const lng = (i18n && i18n.language) || "en";

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation t={t} lng={lng} />
      </NavigationWrapper>
      <PlansWrapper>
        <Plans lng={lng} />
      </PlansWrapper>
      <GetReadyWrapper>
        <GetReady />
      </GetReadyWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LandingWrapper>
  );
};

Pricing.propTypes = {
  i18n: shape({ language: string.isRequired }).isRequired,
  t: func.isRequired
};

export default compose(
  requireAuth(false),
  withTranslation(namespaces)
)(Pricing);
