import React from "react";
import { Box } from "@rebass/grid";

import { Trans } from "i18n";
import { useT } from "utils/hooks";
import { IntegrationsLandingList } from "components/Landing";
import { BlueText, Container, H2Styled, SubtitleStyled } from "./styled";

const Integrations = () => {
  const t = useT("landing");
  return (
    <Container pt="50px" pb="320px">
      <Box width={[1, 1 / 2]} mb={5}>
        <H2Styled mb="24px" id="integrations">
          {t("integrationsHub.title")}
        </H2Styled>
        <SubtitleStyled mb="80px">
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
