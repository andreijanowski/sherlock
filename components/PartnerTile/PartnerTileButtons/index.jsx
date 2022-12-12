import React, { useState } from "react";
import { arrayOf, func, oneOfType, shape, bool } from "prop-types";

import { getIntegrationLinkProps } from "utils/integrations";
import { Button } from "../../buttons";
import clsx from "clsx";
import { Modal } from "components/index";
import YoutubeVideo from "components/YoutubeVideo";

const PartnerTileButtons = ({
  t,
  partner,
  isIntegration,
  onOrderNowClick,
  trackClickEvent
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const toggleVideo = () => setShowVideo(show => !show);
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
              rootClassName={"w-full font-bold text-primary-dark"}
              onClick={toggleVideo}
            >
              {t("app:Video")}
            </Button>
            {showVideo && (
              <Modal open onClose={toggleVideo}>
                <YoutubeVideo url={videoUrl} />
              </Modal>
            )}
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
              {...getIntegrationLinkProps(partner)}
              rootClassName={"w-full"}
              onClick={handleOrder}
            >
              {t("app:info")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

PartnerTileButtons.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
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
