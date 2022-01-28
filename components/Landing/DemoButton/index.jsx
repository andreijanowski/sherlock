import React from "react";

import { useT } from "utils/hooks";
import { SUBSCRIPTION_ENTREPRISE_URL } from "consts";
import CTAButton from "../CTAButton";

const DemoButton = () => {
  const t = useT("landing");
  return <CTAButton label={t("bookDemo")} href={SUBSCRIPTION_ENTREPRISE_URL} />;
};

DemoButton.propTypes = {};

export default DemoButton;
