import React, { useCallback } from "react";

import { useT } from "utils/hooks";
import { SUBSCRIPTION_ENTREPRISE_URL, GOOGLE_ADS_IDS } from "consts";
import { handleGtagEvent } from "utils/gtag";
import CTAButton from "../CTAButton";

const DEMO_URL = SUBSCRIPTION_ENTREPRISE_URL;

const DemoButton = props => {
  const t = useT("landing");

  const onLinkClick = useCallback(e => {
    e.preventDefault();

    const cb = () => {
      window.open(DEMO_URL, "_blank", "noreferrer,noopener");
    };

    handleGtagEvent({
      event: "event",
      action: "conversion",
      to: GOOGLE_ADS_IDS.DEMO_BUTTON_EVENT,
      cb
    });
  }, []);

  return (
    <CTAButton
      label={t("bookDemo")}
      href={DEMO_URL}
      onClick={onLinkClick}
      {...props}
    />
  );
};

DemoButton.propTypes = {};

export default DemoButton;
