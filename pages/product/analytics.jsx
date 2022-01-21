import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  FooterWrapper,
  GetReadyLandingTopGradientWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper
} from "sections/landings/common/sharedStyled";
import { GetReady, InstallApp, Navigation } from "sections/landings/common";
import {
  DarkWrapper,
  TopSectionWrapper,
  WhiteWrapper
} from "sections/landings/product/styled";
import { InfoSection, TopSection } from "sections/landings/product";
import {
  AppManager,
  Dashboard,
  IntegrationHub,
  Intelligence,
  Restaurant
} from "components/Icons";
import {
  getAdvPrefix,
  getDescriptionPrefix
} from "sections/landings/product/utils";
import { useLng } from "utils/hooks";
import { API_URL, FOODETECTIVE_URL } from "consts";

const PAGE_NAME = "analytics";

const AnalyticsPage = () => {
  const lng = useLng();

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <TopSectionWrapper>
        <TopSection
          name={PAGE_NAME}
          leftColumnProps={{
            pt: [46, null, null, 40]
          }}
        />
      </TopSectionWrapper>
      <WhiteWrapper id="intelligence">
        <InfoSection
          name={`${PAGE_NAME}.intelligence`}
          icon={<Intelligence />}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/intelligence.png`,
              mb: 30,
              mx: "auto",
              width: ["90%", null, null, "480px"]
            },
            {
              src: `/static/img/${PAGE_NAME}/intelligenceHirePopup.png`,
              width: ["173px", "200px", null, "228px"],
              right: [-5, null, null, -58],
              top: [-10, null, null, -18]
            },
            {
              src: `/static/img/${PAGE_NAME}/intelligenceIncreasePopup.png`,
              left: [0, null, null, -50],
              bottom: [10, null, null, -10],
              width: ["138px", "160px", null, "228px"]
            }
          ]}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          advantagesColumnsWidth={1}
          textLinks={{
            [getDescriptionPrefix(0)]: [
              {
                href: `/${lng}/product/analytics#integrations`
              },
              {
                href: `/${lng}/product/analytics#dashboard`
              }
            ]
          }}
        />
      </WhiteWrapper>
      <DarkWrapper id="dashboard">
        <InfoSection
          name={`${PAGE_NAME}.dashboard`}
          icon={<Dashboard />}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/dashboard.png`,
              mt: [40, null, null, 75],
              mb: [30, null, null, 110],
              mx: "auto",
              width: ["90%", null, null, "480px"]
            },
            {
              src: `/static/img/${PAGE_NAME}/dashboardUpChart.png`,
              width: ["173px", "200px", null, "216px"],
              right: [-5, null, null, -68],
              top: [-10, null, null, 30]
            },
            {
              src: `/static/img/${PAGE_NAME}/dashboardDownChart.png`,
              left: [0, null, null, -65],
              bottom: [10, null, null, 60],
              width: ["138px", "160px", null, "216px"]
            }
          ]}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          advantagesColumnsWidth={1}
          isDark
        />
      </DarkWrapper>
      <WhiteWrapper id="profile">
        <InfoSection
          name={`${PAGE_NAME}.businessProfile`}
          icon={<Restaurant />}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/businessProfile.png`,
              mt: [40, null, null, 75],
              mb: 30,
              mx: "auto",
              width: ["90%", null, null, "458px"]
            },
            {
              src: `/static/img/${PAGE_NAME}/businessProfileLinks.png`,
              width: ["180px", null, null, "233px"],
              right: [-5, null, null, -68],
              top: [-10, null, null, 30]
            },
            {
              src: `/static/img/${PAGE_NAME}/businessProfileLinksDropdown.png`,
              width: ["156px", null, null, "205px"],
              right: [8, null, null, -54],
              top: [44, null, null, 100]
            },
            {
              src: `/static/img/${PAGE_NAME}/businessProfileHours.png`,
              left: [0, null, null, -65],
              bottom: [10, null, null, -20],
              width: ["138px", "160px", null, "216px"]
            }
          ]}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          textLinks={{
            [getAdvPrefix({ optionIndex: 0, advIndex: 0 })]: {
              href: `${API_URL}/users/sign_up?locale=${lng}`,
              target: "_blank"
            },
            [getAdvPrefix({ optionIndex: 0, advIndex: 2 })]: {
              href: `/${lng}/product/marketing#presenceManagement`
            },
            [getAdvPrefix({ optionIndex: 0, advIndex: 4 })]: {
              href: FOODETECTIVE_URL,
              target: "_blank"
            }
          }}
        />
      </WhiteWrapper>
      <DarkWrapper id="integrations">
        <InfoSection
          name={`${PAGE_NAME}.integrations`}
          icon={<IntegrationHub />}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/integrations.png`,
              width: ["90%", null, null, "486px"],
              mt: 30,
              mx: "auto",
              mb: [44, null, null, 110]
            },
            {
              src: `/static/img/${PAGE_NAME}/integrationsLightspeed.png`,
              width: ["180px", null, null, "233px"],
              right: [-5, null, null, -68],
              top: [-10, null, null, -20]
            },
            {
              src: `/static/img/${PAGE_NAME}/integrationsUberEats.png`,
              left: [0, null, null, -65],
              bottom: [10, null, null, 60],
              width: ["138px", "160px", null, "216px"]
            }
          ]}
          columnsProportions={[[1, null, null, 3 / 5], [1, null, null, 2 / 5]]}
          advantagesColumnsWidth={1}
          isDark
        />
      </DarkWrapper>
      <WhiteWrapper id="appManager">
        <InfoSection
          name={`${PAGE_NAME}.appManager`}
          icon={<AppManager />}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/appManager.png`,
              width: ["90%", null, null, "504px"],
              mx: "auto",
              my: 30
            },
            {
              src: `/static/img/${PAGE_NAME}/appManagerDelivery.png`,
              width: ["120px", null, null, "195px"],
              top: [0, null, null, -20],
              right: [0, null, null, -45]
            },
            {
              src: `/static/img/${PAGE_NAME}/appManagerPayments.png`,
              width: ["120px", null, null, "197px"],
              left: [0, null, null, -76],
              bottom: [0, null, null, -20]
            }
          ]}
          columnsProportions={[[1, null, null, 3 / 5], [1, null, null, 2 / 5]]}
          advantagesColumnsWidth={1}
        />
      </WhiteWrapper>

      <GetReadyLandingTopGradientWrapper>
        <GetReady />
      </GetReadyLandingTopGradientWrapper>
      <InstallAppWrapper>
        <InstallApp />
      </InstallAppWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LandingWrapper>
  );
};

export default requireAuth(false)(AnalyticsPage);
