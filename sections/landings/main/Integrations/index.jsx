import React from "react";
import { Box } from "@rebass/grid";

import { Trans } from "i18n";
import { useT } from "utils/hooks";
import { IntegrationsLandingList } from "components/Landing";
import { AdaptiveBox } from "components/styleguide/common";
import {
  BlueText,
  Container,
  H2Styled,
  SubtitleStyled,
  Image,
  ImageContainer
} from "./styled";

const Integrations = () => {
  const t = useT("landing");
  return (
    <Container pt="50px" pb={[95, null, null, "220px"]} px={3}>
      <Box
        width={[1, null, null, 1 / 2]}
        mb={[3, null, 5]}
        mx={["auto", null, null, 0]}
      >
        <H2Styled mb="24px" id="management" tabletCentered>
          {t("centralizedManagement")}
        </H2Styled>
        <AdaptiveBox
          display={["block"]}
          width={[1, null, null, 2 / 5]}
          pl={[0, null, 20]}
          mb="24px"
        >
          <ImageContainer>
            <Image src="/static/img/centralManagement.svg" />
          </ImageContainer>
        </AdaptiveBox>
        <H2Styled mb="24px" id="integrations" tabletCentered>
          {t("integrationsHub.title")}
        </H2Styled>
        <SubtitleStyled mb={[4, null, "80px"]} tabletCentered>
          <Trans
            t={t}
            i18nKey="integrationsHub.description"
            components={[<BlueText />]}
          />
        </SubtitleStyled>
      </Box>
      <IntegrationsLandingList />
    </Container>
  );
};

export default Integrations;
