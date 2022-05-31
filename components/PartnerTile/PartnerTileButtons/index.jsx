import React from "react";
import { arrayOf, func, oneOfType, shape, bool, string } from "prop-types";

import { getIntegrationLinkProps } from "utils/integrations";
import PlayVideoButton from "../PlayVideoButton";
import { BlueButton } from "../styled";
import { ButtonsContainer, ButtonWrapper } from "./styled";

const PartnerTileButtons = ({
  t,
  partner,
  isIntegration,
  linkLabel,
  onOrderNowClick
}) => {
  const videoUrl = partner.get("videoUrl");
  const email = partner.get("email");
  const phone = partner.get("phone");
  const bookMeeting = partner.get("bookMeeting");

  const isBig = !isIntegration;

  return (
    <ButtonsContainer
      width={isIntegration ? 1 : undefined}
      isIntegration={isIntegration}
    >
      {videoUrl && (
        <ButtonWrapper isIntegration={isIntegration}>
          <PlayVideoButton big={isBig} t={t} url={videoUrl} />
        </ButtonWrapper>
      )}
      {phone ? (
        <ButtonWrapper>
          <BlueButton
            big={isBig}
            as="a"
            href={`tel:${phone}`}
            styleName="navyBlue"
          >
            {t("app:manageIntegrations.call")}
          </BlueButton>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper />
      )}
      {bookMeeting ? (
        <ButtonWrapper>
          <BlueButton
            big={isBig}
            as="a"
            target="_blank"
            href={`mailto: ${bookMeeting}`}
            styleName="navyBlue"
          >
            {t("app:manageIntegrations.meeting")}
          </BlueButton>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper />
      )}
      {email ? (
        <ButtonWrapper>
          <BlueButton
            big={isBig}
            as="a"
            target="_blank"
            href={`mailto: ${email}`}
            styleName="navyBlue"
          >
            {t("app:manageIntegrations.email")}
          </BlueButton>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper />
      )}
      <ButtonWrapper isIntegration={isIntegration} onClick={onOrderNowClick}>
        <BlueButton big={isBig} {...getIntegrationLinkProps(partner)}>
          {linkLabel}
        </BlueButton>
      </ButtonWrapper>
    </ButtonsContainer>
  );
};

PartnerTileButtons.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  linkLabel: string.isRequired,
  isIntegration: bool,
  t: func.isRequired,
  onOrderNowClick: func
};

PartnerTileButtons.defaultProps = {
  isIntegration: false,
  onOrderNowClick: null
};

export default PartnerTileButtons;
