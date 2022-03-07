import React, { useCallback } from "react";

import { useT } from "utils/hooks";
import { useRouter } from "next/router";
import { SUBSCRIPTION_ENTREPRISE_URL, GOOGLE_ADS_IDS } from "consts";
import { handleGtagEvent } from "utils/gtag";
import CTAButton from "../CTAButton";

const DEMO_URL = SUBSCRIPTION_ENTREPRISE_URL;

const DemoButton = props => {
  const router = useRouter();
  const t = useT("landing");

  const onLinkClick = useCallback(
    e => {
      e.preventDefault();

      const cb = () => {
        router.push(DEMO_URL);
      };

      handleGtagEvent({
        event: "event",
        action: "conversion",
        to: GOOGLE_ADS_IDS.DEMO_BUTTON_EVENT,
        cb
      });
    },
    [router]
  );

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
