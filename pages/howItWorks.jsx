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
import { InfoSection } from "sections/landings/product";
import { getAdvPrefix } from "sections/landings/product/utils";
import { useLng } from "utils/hooks";
import TopSection from "sections/landings/howItWorks/TopSection";
import {
  CreateAccountButton,
  DemoButton,
  DownloadButton
} from "components/Landing";

const PAGE_NAME = "howItWorks";

const DOWNLOAD_SECTION_ID = "downloadApp";

const HowItWorksPage = () => {
  const lng = useLng();

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <TopSectionWrapper>
        <TopSection />
      </TopSectionWrapper>
      <WhiteWrapper>
        <InfoSection
          step={1}
          name={`${PAGE_NAME}.step1`}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/createAccount.png`,
              width: ["90%", null, null, "348px"],
              mb: [44, null, null, 0],
              noShadow: true
            },
            {
              src: `/static/img/${PAGE_NAME}/createAccountPopup.png`,
              width: ["173px", null, null, "293px"],
              bottom: [5, null, null, 115],
              right: [-5, null, null, -100]
            }
          ]}
          columnsProportions={[
            [1, null, null, 1 / 2],
            [1, null, null, 1 / 2]
          ]}
          advantagesColumnsWidth={1}
          textLinks={{
            [getAdvPrefix({ optionIndex: 0, advIndex: 0 })]: {
              href: `/${lng}/product/analytics#profile`
            },
            [getAdvPrefix({ optionIndex: 0, advIndex: 1 })]: {
              href: `/${lng}/product/marketing#presenceManagement`
            }
          }}
          ctaButton={<CreateAccountButton />}
        />
      </WhiteWrapper>
      <DarkWrapper>
        <InfoSection
          step={2}
          name={`${PAGE_NAME}.step2`}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/clickConnect.png`,
              width: ["90%", null, null, "348px"],
              mb: [44, null, null, 100],
              noShadow: true
            },
            {
              src: `/static/img/${PAGE_NAME}/clickConnectPopup.gif`,
              width: ["250px", null, null, "344px"],
              bottom: [5, null, null, 220],
              left: [-5, null, null, -170]
            }
          ]}
          columnsProportions={[
            [1, null, null, 1 / 2],
            [1, null, null, 1 / 2]
          ]}
          advantagesColumnsWidth={1}
          textLinks={{
            [getAdvPrefix({ optionIndex: 0, advIndex: 0 })]: {
              href: `/${lng}/product/analytics#integrations`
            }
          }}
          ctaButton={<DemoButton />}
          isDark
        />
      </DarkWrapper>
      <WhiteWrapper>
        <InfoSection
          step={3}
          name={`${PAGE_NAME}.step3`}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/manage.png`,
              width: ["90%", null, null, "408px"],
              mb: [44, null, null, 0],
              noShadow: true
            },
            {
              src: `/static/img/${PAGE_NAME}/managePopup.png`,
              width: ["150px", "200px", null, "260px"],
              bottom: [5, null, null, 30],
              right: [-5, null, null, -170]
            }
          ]}
          columnsProportions={[
            [1, null, null, 3 / 5],
            [1, null, null, 2 / 5]
          ]}
          advantagesColumnsWidth={1}
          ctaButton={<DemoButton />}
        />
      </WhiteWrapper>
      <DarkWrapper>
        <InfoSection
          step={4}
          name={`${PAGE_NAME}.step4`}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/dashboard.png`,
              width: ["70%", "80%", "90%", "361px"],
              mb: [44, null, null, 100],
              noShadow: true
            },
            {
              src: `/static/img/${PAGE_NAME}/dashboardStockPopup.png`,
              width: ["150px", null, null, "222px"],
              top: [-30, null, null, -55],
              left: [-5, null, null, -120]
            },
            {
              src: `/static/img/${PAGE_NAME}/dashboardLiveStreamPopup.png`,
              width: ["130px", null, null, "200px"],
              bottom: [5, null, null, 20],
              right: [-5, null, null, -90]
            }
          ]}
          columnsProportions={[
            [1, null, null, 1 / 2],
            [1, null, null, 1 / 2]
          ]}
          advantagesColumnsWidth={1}
          textLinks={{
            [getAdvPrefix({ optionIndex: 0, advIndex: 0 })]: {
              href: `/${lng}/product/analytics#dashboard`
            }
          }}
          ctaButton={<DemoButton />}
          isDark
        />
      </DarkWrapper>
      <WhiteWrapper>
        <InfoSection
          step={5}
          name={`${PAGE_NAME}.step5`}
          images={[
            {
              src: `/static/img/${PAGE_NAME}/access.png`,
              width: ["90%", null, null, "403px"],
              mb: [44, null, null, 0],
              noShadow: true
            },
            {
              src: `/static/img/${PAGE_NAME}/accessPopup.png`,
              width: ["190px", null, null, "239px"],
              bottom: [5, null, null, 30],
              right: [-5, null, null, -140]
            }
          ]}
          columnsProportions={[
            [1, null, null, 3 / 5],
            [1, null, null, 2 / 5]
          ]}
          advantagesColumnsWidth={1}
          ctaButton={<DownloadButton sectionId={DOWNLOAD_SECTION_ID} />}
        />
      </WhiteWrapper>
      <GetReadyLandingTopGradientWrapper>
        <GetReady />
      </GetReadyLandingTopGradientWrapper>
      <InstallAppWrapper id={DOWNLOAD_SECTION_ID}>
        <InstallApp />
      </InstallAppWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LandingWrapper>
  );
};

export default requireAuth(false)(HowItWorksPage);
