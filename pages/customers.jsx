import React from "react";
import { Box } from "@rebass/grid";

import requireAuth from "lib/requireAuth";
import { Footer } from "components";
import {
  FooterWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper
} from "sections/landings/common/sharedStyled";
import {
  InstallApp,
  Navigation,
  OnboardPartners
} from "sections/landings/common";
import {
  BottomDarkWrapper,
  DarkWrapper,
  TopDarkWrapper,
  WhiteWrapper
} from "sections/landings/product/styled";
import { InfoSection } from "sections/landings/product";
import {
  getDescriptionPrefix,
  getOptionPrefix
} from "sections/landings/product/utils";
import { DemoButton, LicensingButton } from "components/Landing";
import { useLng } from "utils/hooks";

const PAGE_NAME = "customers";

const DOWNLOAD_SECTION_ID = "downloadApp";

const getSectionVideos = sectionName => ({
  [getOptionPrefix(0)]: {
    poster: `/static/img/${PAGE_NAME}/${sectionName}.png`,
    width: 500,
    height: 620,
    src: `/static/videos/${PAGE_NAME}/${sectionName}.mp4`
  }
});

const CustomersPage = () => {
  const lng = useLng();

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper isDark>
        <Navigation />
      </NavigationWrapper>
      <TopDarkWrapper>
        <InfoSection
          name={`${PAGE_NAME}.independent`}
          videos={getSectionVideos("independent")}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          advantagesColumnsWidth={1}
          isDark
          isReversed={false}
          ctaButton={<DemoButton />}
        />
        <OnboardPartners
          isDark
          prefix="/static/img/customers/partners/1"
          count={5}
        />
      </TopDarkWrapper>
      <WhiteWrapper>
        <InfoSection
          name={`${PAGE_NAME}.chains`}
          videos={getSectionVideos("chains")}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          advantagesColumnsWidth={1}
          isReversed
          ctaButton={<DemoButton />}
        />
        <OnboardPartners prefix="/static/img/customers/partners/2" count={5} />
      </WhiteWrapper>
      <DarkWrapper>
        <InfoSection
          name={`${PAGE_NAME}.kitchens`}
          videos={getSectionVideos("kitchens")}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          advantagesColumnsWidth={1}
          isDark
          isReversed={false}
          ctaButton={<DemoButton />}
        />
        <OnboardPartners
          isDark
          prefix="/static/img/customers/partners/3"
          count={5}
        />
      </DarkWrapper>
      <WhiteWrapper>
        <InfoSection
          name={`${PAGE_NAME}.kiosks`}
          videos={getSectionVideos("kiosks")}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          advantagesColumnsWidth={1}
          isReversed
          ctaButton={<DemoButton />}
        />
        <OnboardPartners prefix="/static/img/customers/partners/4" count={5} />
      </WhiteWrapper>
      <BottomDarkWrapper>
        <InfoSection
          name={`${PAGE_NAME}.wholesalers`}
          videos={getSectionVideos("wholesalers")}
          columnsProportions={[[1, null, null, 1 / 2], [1, null, null, 1 / 2]]}
          advantagesColumnsWidth={1}
          isDark
          isReversed={false}
          ctaButton={
            // prettier vs eslint conflict
            // eslint-disable-next-line react/jsx-wrap-multilines
            <>
              <Box mb="24px">
                <DemoButton />
              </Box>
              <LicensingButton />
            </>
          }
          textLinks={{
            [getDescriptionPrefix(0)]: [
              {
                href: `/${lng}/product/operations#procurement`
              }
            ]
          }}
        />
        <OnboardPartners
          isDark
          prefix="/static/img/customers/partners/5"
          count={5}
        />
      </BottomDarkWrapper>
      <InstallAppWrapper id={DOWNLOAD_SECTION_ID}>
        <InstallApp />
      </InstallAppWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LandingWrapper>
  );
};

export default requireAuth(false)(CustomersPage);
