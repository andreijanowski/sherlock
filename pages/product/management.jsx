import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  FooterWrapper,
  GetReadyLandingWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper
} from "sections/landings/common/sharedStyled";
import { GetReady, InstallApp, Navigation } from "sections/landings/common";
import {
  BenefitsWrapper,
  DarkWrapper,
  TopSectionWrapper,
  WhiteWrapper
} from "sections/landings/product/styled";
import { Benefits, InfoSection, TopSection } from "sections/landings/product";
import {
  Clients,
  Delivery,
  EventsManagement,
  MenuManagement
} from "components/Icons";

const PAGE_NAME = "management";

const ManagementPage = () => (
  <LandingWrapper width={1} alignItems="center" flexDirection="column">
    <NavigationWrapper>
      <Navigation />
    </NavigationWrapper>
    <TopSectionWrapper>
      <TopSection name={PAGE_NAME} />
    </TopSectionWrapper>
    <WhiteWrapper>
      <InfoSection
        name={`${PAGE_NAME}.orders`}
        icon={<Delivery />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/ordersManagement.png`,
            width: ["100%", null, null, "490px"]
          }
        ]}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
        linkTo="/#integrations"
      />
    </WhiteWrapper>
    <DarkWrapper>
      <InfoSection
        name={`${PAGE_NAME}.menu`}
        icon={<MenuManagement />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/menu.png`,
            mt: 82,
            mb: [74, null, null, 0],
            mx: "auto",
            width: ["90%", null, null, "442px"]
          },
          {
            src: `/static/img/${PAGE_NAME}/menuUpdatesPopup.png`,
            width: ["173px", "200px", null, "258px"],
            right: [-5, null, null, -37],
            top: [40, null, null, 0]
          },
          {
            src: `/static/img/${PAGE_NAME}/menuConfirmPopup.png`,
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
        name={`${PAGE_NAME}.reservation`}
        icon={<Delivery />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/reservations.png`,
            width: ["95%", null, null, "480px"],
            mb: [60, null, null, 0]
          },
          {
            src: `/static/img/${PAGE_NAME}/reservationsPopup.png`,
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
        name={`${PAGE_NAME}.events`}
        icon={<EventsManagement />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/events.png`,
            width: ["100%", null, null, "640px"],
            mb: [44, null, null, 0]
          }
        ]}
        columnsProportions={[[1, null, null, 3 / 5], [1, null, null, 2 / 5]]}
        advantagesColumnsWidth={1}
        isDark
      />
    </DarkWrapper>
    <WhiteWrapper>
      <InfoSection
        name={`${PAGE_NAME}.customers`}
        icon={<Clients />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/customers.png`,
            width: ["90%", null, null, "603px"],
            mr: [0, null, null, 60],
            mb: [44, null, null, 0]
          },
          {
            src: `/static/img/${PAGE_NAME}/customersPopup.png`,
            width: ["81px", "163px"],
            top: [23, 30, 80, 28],
            right: [0, null, null, -10]
          }
        ]}
        columnsProportions={[[1, null, null, 3 / 5], [1, null, null, 2 / 5]]}
        advantagesColumnsWidth={1}
      />
    </WhiteWrapper>
    <BenefitsWrapper>
      <Benefits name={PAGE_NAME} />
    </BenefitsWrapper>
    <GetReadyLandingWrapper>
      <GetReady />
    </GetReadyLandingWrapper>
    <InstallAppWrapper>
      <InstallApp />
    </InstallAppWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </LandingWrapper>
);

export default requireAuth(false)(ManagementPage);
