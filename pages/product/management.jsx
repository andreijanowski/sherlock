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
  WhiteWrapper,
  BenefitsWrapper
} from "sections/landings/product/styled";
import { InfoSection, TopSection, Benefits } from "sections/landings/product";
import {
  Clients,
  Delivery,
  EventsManagement,
  MenuManagement
} from "components/Icons";

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
            width: ["100%", null, null, "490px"]
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
            mb: [74, null, null, 0],
            mx: "auto",
            width: ["90%", null, null, "442px"]
          },
          {
            src: "/static/img/management/menuUpdatesPopup.png",
            width: ["173px", "200px", null, "258px"],
            right: [-5, null, null, -37],
            top: [40, null, null, 0]
          },
          {
            src: "/static/img/management/menuConfirmPopup.png",
            left: [0, null, null, -30],
            bottom: [25, null, null, -45],
            width: ["138px", "160px", null, "206px"]
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
            width: ["95%", null, null, "480px"],
            mb: [60, null, null, 0]
          },
          {
            src: "/static/img/management/reservationsPopup.png",
            width: ["181px", null, null, "273px"],
            bottom: [20, null, null, -77],
            right: [0, null, null, -33]
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
    <WhiteWrapper>
      <InfoSection
        name="management.customers"
        icon={<Clients />}
        images={[
          {
            src: "/static/img/management/customers.png",
            width: "603px",
            mr: 60
          },
          {
            src: "/static/img/management/customersPopup.png",
            width: "163px",
            top: 28,
            right: -15
          }
        ]}
        columnsProportions={[[1, null, null, 3 / 5], [1, null, null, 2 / 5]]}
        advantagesColumnsWidth={1}
      />
    </WhiteWrapper>
    <BenefitsWrapper>
      <Benefits name="management" />
    </BenefitsWrapper>
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
