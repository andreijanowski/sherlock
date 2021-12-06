import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  FooterWrapper,
  GetReadyWrapper,
  LandingWrapper,
  NavigationWrapper,
  PlansWrapper
} from "sections/common/sharedStyled";
import { GetReady, Plans } from "sections/pricing/subscriptions";
import Navigation from "sections/common/Navigation";

const Subscriptions = () => (
  <LandingWrapper width={1} alignItems="center" flexDirection="column">
    <NavigationWrapper>
      <Navigation />
    </NavigationWrapper>
    <PlansWrapper>
      <Plans />
    </PlansWrapper>
    <GetReadyWrapper>
      <GetReady />
    </GetReadyWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </LandingWrapper>
);

export default requireAuth(false)(Subscriptions);
