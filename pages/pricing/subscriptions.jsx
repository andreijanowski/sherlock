import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  FooterWrapper,
  GetReadyWrapper,
  LandingWrapper,
  NavigationWrapper,
  PlansWrapper
} from "sections/landings/common/sharedStyled";
import { Plans } from "sections/landings/pricing/subscriptions";
import { GetReady, Navigation } from "sections/landings/common";

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
