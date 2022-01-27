import React from "react";
import { string } from "prop-types";

import { useT } from "utils/hooks";
import CTAButton from "../CTAButton";

const DownloadButton = ({ sectionId }) => {
  const t = useT("landing");
  return (
    <CTAButton label={t("downloadApp")} href={`#${sectionId}`} target="_self" />
  );
};

DownloadButton.propTypes = {
  sectionId: string.isRequired
};

export default DownloadButton;
