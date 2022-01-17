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
  DarkWrapper,
  TopSectionWrapper,
  WhiteWrapper
} from "sections/landings/product/styled";
import { InfoSection, TopSection } from "sections/landings/product";
import { Payments, StockManagement, Wholesalers } from "components/Icons";

const PAGE_NAME = "operations";

const OperationsPage = () => (
  <LandingWrapper width={1} alignItems="center" flexDirection="column">
    <NavigationWrapper>
      <Navigation />
    </NavigationWrapper>
    <TopSectionWrapper>
      <TopSection name={PAGE_NAME} />
    </TopSectionWrapper>
    <WhiteWrapper>
      <InfoSection
        name={`${PAGE_NAME}.payments`}
        icon={<Payments />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/payments.png`,
            width: ["100%", null, null, "622px"]
          }
        ]}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
        advantagesColumnsWidth={1}
      />
    </WhiteWrapper>
    <DarkWrapper>
      <InfoSection
        name={`${PAGE_NAME}.procurement`}
        icon={<Wholesalers />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/procurement.png`,
            mt: [40, null, null, 82],
            mb: [74, null, null, 0],
            mx: "auto",
            width: ["90%", null, null, "360px"]
          },
          {
            src: `/static/img/${PAGE_NAME}/procurementUpdatesPopup.png`,
            width: ["173px", "200px", null, "202px"],
            right: [-5, null, null, -37],
            top: [0, null, null, 50]
          },
          {
            src: `/static/img/${PAGE_NAME}/procurementConfirmPopup.png`,
            left: [0, null, null, -60],
            bottom: [25, null, null, -25],
            width: ["138px", "160px", null, "160px"]
          }
        ]}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
        isDark
      />
    </DarkWrapper>
    <WhiteWrapper>
      <InfoSection
        name={`${PAGE_NAME}.stockManagement`}
        icon={<StockManagement />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/stockManagement.png`,
            width: ["100%", null, null, "514px"],
            mb: [15, null, null, 0]
          }
        ]}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
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

export default requireAuth(false)(OperationsPage);
