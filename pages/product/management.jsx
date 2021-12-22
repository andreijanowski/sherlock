import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  FooterWrapper,
  GetReadyWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper
} from "sections/landings/common/sharedStyled";
import { GetReady, InstallApp, Navigation } from "sections/landings/common";
import { theme } from "utils/theme";
import {
  TopSectionWrapper,
  WhiteWrapper
} from "sections/landings/product/styled";
import { InfoSection, TopSection } from "sections/landings/product";
import { Delivery } from "components/Icons";

const ManagementPage = () => (
  <LandingWrapper width={1} alignItems="center" flexDirection="column">
    <NavigationWrapper>
      <Navigation />
    </NavigationWrapper>
    <TopSectionWrapper>
      <TopSection />
    </TopSectionWrapper>
    <WhiteWrapper>
      <InfoSection
        name="management.orders"
        icon={<Delivery />}
        images={[
          {
            src: "/static/img/management/ordersManagement.png",
            width: "490px"
          }
        ]}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
        linkTo="/#integrations"
      />
    </WhiteWrapper>
    <GetReadyWrapper bgColor={theme.colors.landingDarkBlue}>
      <GetReady />
    </GetReadyWrapper>
    <InstallAppWrapper>
      <InstallApp />
    </InstallAppWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </LandingWrapper>
);

export default requireAuth(false)(ManagementPage);
