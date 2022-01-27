import React from "react";

import { useT } from "utils/hooks";
import { LICENSING_TYPEFORM_LINK } from "consts";
import { BUTTON_VARIANT } from "components/styleguide/Button";
import CTAButton from "../CTAButton";

const LicensingButton = () => {
  const t = useT("landing");
  return (
    <CTAButton
      label={t("ourLicensing")}
      variant={BUTTON_VARIANT.OUTLINE}
      href={LICENSING_TYPEFORM_LINK}
    />
  );
};

LicensingButton.propTypes = {};

export default LicensingButton;
