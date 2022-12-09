import React from "react";
import { arrayOf, func, oneOfType, shape, bool, string } from "prop-types";

// import { getIntegrationLinkProps } from "utils/integrations";
// import PlayVideoButton from "../PlayVideoButton";
// import { BlueButton } from "../styled";
// import { ButtonsContainer, ButtonWrapper } from "./styled";
import { Button } from "../../buttons";
import clsx from "clsx";

const PartnerTileButtons = ({
  t,
  partner,
  isIntegration,
  linkLabel,
  onOrderNowClick,
  trackClickEvent
}) => {
  const videoUrl = partner.get("videoUrl");
  const email = partner.get("email");
  const phone = partner.get("phone");
  const bookMeeting = partner.get("bookMeeting");
  const url = partner.get("websiteUrl");

  // const isBig = !isIntegration;
  const btnLength = [videoUrl, phone, bookMeeting, email, url].filter(
    item => item !== null
  ).length;

  const handleOrder = e => {
    if (onOrderNowClick) {
      onOrderNowClick(e);
    }
    if (trackClickEvent) {
      trackClickEvent("WEBSITE");
    }
  };

  return (
    <>
      <div className={clsx("flex flex-wrap", isIntegration && "flex-row")}>
        {videoUrl && (
          <div
            className={clsx(
              "mt-[2%] odd:mr-[2%]",
              btnLength > 1 ? "w-[49%]" : "w-full"
            )}
          >
            <Button
              color="primary"
              variant={"outlined"}
              append="mdi:play"
              square
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              rootClassName={"w-full font-bold text-primary-dark"}
            >
              {t("app:Video")}
            </Button>
          </div>
        )}
        {phone && (
          <div
            className={clsx(
              "mt-[2%] odd:mr-[2%]",
              btnLength > 1 ? "w-[49%]" : "w-full"
            )}
          >
            <Button
              color="gradient"
              square
              href={`tel:${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              rootClassName={"w-full"}
            >
              {t("app:manageIntegrations.call")}
            </Button>
          </div>
        )}
        {bookMeeting && (
          <div
            className={clsx(
              "mt-[2%] odd:mr-[2%]",
              btnLength > 1 ? "w-[49%]" : "w-full"
            )}
          >
            <Button
              color="gradient"
              square
              href={`mailto: ${bookMeeting}`}
              target="_blank"
              rel="noopener noreferrer"
              rootClassName={"w-full"}
            >
              {t("app:manageIntegrations.meeting")}
            </Button>
          </div>
        )}
        {email && (
          <div
            className={clsx(
              "mt-[2%] odd:mr-[2%]",
              btnLength > 1 ? "w-[49%]" : "w-full"
            )}
          >
            <Button
              color="gradient"
              square
              href={`mailto: ${email}`}
              target="_blank"
              rel="noopener noreferrer"
              rootClassName={"w-full"}
            >
              {t("app:manageIntegrations.email")}
            </Button>
          </div>
        )}
        {url && (
          <div
            className={clsx(
              "mt-[2%] odd:mr-[2%]",
              btnLength > 1 ? "w-[49%]" : "w-full"
            )}
          >
            <Button
              color="gradient"
              square
              href={`mailto: ${email}`}
              target="_blank"
              rel="noopener noreferrer"
              rootClassName={"w-full"}
              onClick={handleOrder}
            >
              {t("app:info")}
            </Button>
          </div>
        )}
      </div>

      {/* <ButtonsContainer
        width={isIntegration ? 1 : undefined}
        isIntegration={isIntegration}
      > */}
      {/* {videoUrl && (
          <ButtonWrapper isIntegration={isIntegration}>
            <PlayVideoButton
              trackClickEvent={trackClickEvent}
              big={isBig}
              t={t}
              url={videoUrl}
              styleName="outlineBlue"
            />
          </ButtonWrapper>
        )} */}
      {/* {phone ? (
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
        )} */}
      {/* {bookMeeting ? (
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
        )} */}
      {/* {email ? (
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
        )} */}
      {/* <ButtonWrapper isIntegration={isIntegration} onClick={handleOrder}>
          <BlueButton
            big={isBig}
            {...getIntegrationLinkProps(partner)}
            gradient
          >
            {linkLabel}
          </BlueButton>
        </ButtonWrapper> */}
      {/* </ButtonsContainer> */}
    </>
  );
};

PartnerTileButtons.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  linkLabel: string.isRequired,
  isIntegration: bool,
  t: func.isRequired,
  onOrderNowClick: func,
  trackClickEvent: func
};

PartnerTileButtons.defaultProps = {
  isIntegration: false,
  onOrderNowClick: null,
  trackClickEvent: null
};

export default PartnerTileButtons;
