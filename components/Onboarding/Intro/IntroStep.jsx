import React from "react";
// import { func } from "prop-types";
import { Trans } from "i18n";
import { useT } from "utils/hooks";
import {
  Header,
  Wrapper,
  Blue,
  Image,
  TilesWrapper,
  StepTile,
  TileHeader,
  StyledH3
} from "./styled";

const Step1 = () => {
  const t = useT("onboarding");

  return (
    <Wrapper>
      <Header>
        <Trans t={t} i18nKey="intro.header" components={[<Blue />]} />
      </Header>
      <TilesWrapper>
        <StepTile>
          <TileHeader>
            <StyledH3>{t("intro.tiles.step1.header")}</StyledH3>
            {t("intro.tiles.step1.content")}
          </TileHeader>
          <Image src="/static/img/onboarding/introstep1.svg" />
        </StepTile>
        <StepTile>
          <TileHeader>
            <StyledH3>{t("intro.tiles.step2.header")}</StyledH3>
            {t("intro.tiles.step2.content")}
          </TileHeader>
          <Image src="/static/img/onboarding/introstep2.svg" />
        </StepTile>
      </TilesWrapper>
    </Wrapper>
  );
};

// Step1.propTypes = {
//   handleNextStep: func.isRequired
// };

export default Step1;
