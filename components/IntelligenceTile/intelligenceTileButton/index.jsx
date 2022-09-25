import React from "react";
import { func, string } from "prop-types";
import PlayVideoButton from "../../PartnerTile/PlayVideoButton";
import { ButtonsContainer, ButtonWrapper, BlueButton } from "./styled";

const IntelligenceTileButton = ({
  t,
  redirectionUrl,
  redirectionText,
  videoUrl
}) => (
  <ButtonsContainer
    width={redirectionUrl ? 1 : undefined}
    isIntegration={redirectionUrl}
  >
    {videoUrl && (
      <ButtonWrapper isIntegration={!redirectionUrl}>
        <PlayVideoButton big={redirectionUrl} t={t} url={videoUrl} />
      </ButtonWrapper>
    )}
    {redirectionUrl && (
      <ButtonWrapper>
        <BlueButton big as="a" styleName="navyBlue">
          {t("app:seeMore")}
        </BlueButton>
      </ButtonWrapper>
    )}
    {redirectionUrl && (
      <ButtonWrapper>
        <BlueButton big as="a" styleName="navyBlue">
          {redirectionText}
        </BlueButton>
      </ButtonWrapper>
    )}
  </ButtonsContainer>
);

IntelligenceTileButton.defaultProps = {
  // id: shape(),
  // title: string,
  redirectionUrl: string,
  redirectionText: string,
  videoUrl: string
  // description: string
};

IntelligenceTileButton.propTypes = {
  t: func.isRequired,
  // id: string,
  // title: string,
  redirectionUrl: string,
  redirectionText: string,
  videoUrl: string
  // description: string
};

export default IntelligenceTileButton;
