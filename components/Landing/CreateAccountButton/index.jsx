import React from "react";

import { useLng, useT } from "utils/hooks";
import { API_URL } from "consts";
import CTAButton from "../CTAButton";

const CreateAccountButton = () => {
  const t = useT("landing");
  const lng = useLng();

  return (
    <CTAButton
      label={t("createAccountNow")}
      href={`${API_URL}/users/sign_up?locale=${lng}`}
    />
  );
};

CreateAccountButton.propTypes = {};

export default CreateAccountButton;
