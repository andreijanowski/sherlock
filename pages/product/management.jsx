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
import { Delivery, EventsManagement, MenuManagement } from "components/Icons";

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
    <DarkWrapper>
      <InfoSection
        name="management.menu"
        icon={<MenuManagement />}
        images={[
          {
            src: "/static/img/management/menu.png",
            mt: 82,
            width: "442px"
          },
          {
            src: "/static/img/management/menuUpdatesPopup.png",
            width: "258px",
            right: -37,
            top: 0
          },
          {
            src: "/static/img/management/menuConfirmPopup.png",
            left: -30,
            bottom: -45,
            width: "206px"
          }
        ]}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
        isDark
      />
    </DarkWrapper>
    <WhiteWrapper>
      <InfoSection
        name="management.reservation"
        icon={<Delivery />}
        images={[
          {
            src: "/static/img/management/reservations.png",
            width: "480px"
          },
          {
            src: "/static/img/management/reservationsPopup.png",
            width: "273px",
            bottom: -77,
            right: -33
          }
        ]}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
      />
    </WhiteWrapper>
    <DarkWrapper>
      <InfoSection
        name="management.events"
        icon={<EventsManagement />}
        images={[
          {
            src: "/static/img/management/events.png",
            width: "640px"
          }
        ]}
        columnsProportions={[[1, null, null, 3 / 5], [1, null, null, 2 / 5]]}
        advantagesColumnsWidth={1}
        isDark
      />
    </DarkWrapper>
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
