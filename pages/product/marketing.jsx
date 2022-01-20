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
  TopSectionWrapper,
  WhiteWrapper,
  DarkWrapper
} from "sections/landings/product/styled";
import { Benefits, InfoSection, TopSection } from "sections/landings/product";
import {
  InfluencerManagement,
  PresenceManagement,
  Reviews
} from "components/Icons";
import {
  getDescriptionPrefix,
  getOptionPrefix
} from "sections/landings/product/utils";
import { FOODETECTIVE_URL, MANAGEMENT_ADV_VIDEO } from "consts";

const PAGE_NAME = "marketing";

const contentManagementTextLinks = {
  ...new Array(4).fill(null).reduce(
    (acc, _v, index) => ({
      ...acc,
      [getDescriptionPrefix(index)]: [
        {
          href: FOODETECTIVE_URL,
          target: "_blank"
        }
      ]
    }),
    {}
  )
};

const contentManagementVideos = {
  [getOptionPrefix(3)]: MANAGEMENT_ADV_VIDEO
};

const MarketingPage = () => (
  <LandingWrapper width={1} alignItems="center" flexDirection="column">
    <NavigationWrapper>
      <Navigation />
    </NavigationWrapper>
    <TopSectionWrapper>
      <TopSection name={PAGE_NAME} />
    </TopSectionWrapper>
    <WhiteWrapper>
      <InfoSection
        name={`${PAGE_NAME}.contentManagement`}
        icon={<InfluencerManagement />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/contentManagement.png`,
            width: ["100%", null, null, "490px"]
          }
        ]}
        videos={contentManagementVideos}
        columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
        textLinks={contentManagementTextLinks}
      />
    </WhiteWrapper>
    <DarkWrapper>
      <InfoSection
        name={`${PAGE_NAME}.reviewManagement`}
        icon={<Reviews />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/reviewManagement.png`,
            mb: [30, null, null, 110],
            mx: "auto",
            width: ["100%", null, null, "450px"]
          },
          {
            src: `/static/img/${PAGE_NAME}/reviewManagementPopup.png`,
            width: ["173px", null, null, "200px"],
            bottom: [0, null, null, 65],
            right: [-5, null, null, 130]
          }
        ]}
        columnsProportions={[[1, null, null, 2 / 5], [1, null, null, 3 / 5]]}
        isDark
      />
    </DarkWrapper>
    <WhiteWrapper id="presenceManagement">
      <InfoSection
        name={`${PAGE_NAME}.presenceManagement`}
        icon={<PresenceManagement />}
        images={[
          {
            src: `/static/img/${PAGE_NAME}/presenceManagement.png`,
            mb: 30,
            width: ["100%", null, null, "650px"]
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

export default requireAuth(false)(MarketingPage);
