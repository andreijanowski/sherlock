import React from "react";
import { bool, func } from "prop-types";
import Switch from "react-switch";

import { theme } from "utils/theme";
import { getThemeHexColor } from "utils/colors";
import {
  SwitchStyles,
  SwitchWrapper,
  Officon,
  // Onicon,
  // Onhandler,
  Handler
} from "./styled";

// import { useT } from "utils/hooks";

const SwitchBlogButton = ({ isFetching, isBlog, onChange }) => (
  // const t = useT("landing");
  <SwitchWrapper mr={3}>
    <SwitchStyles />
    <Switch
      disabled={isFetching}
      checked={isBlog}
      onChange={() => onChange(!isBlog)}
      handleDiameter={86}
      height={38}
      width={129}
      offColor={getThemeHexColor(theme.colors.darkBlue)}
      onColor={getThemeHexColor(theme.colors.darkBlue)}
      boxShadow={`0 1px 3px rgba(${theme.colors.blue}, 0.48)`}
      activeBoxShadow={`0 0 0 3px rgba(${theme.colors.blue}, 0.48)`}
      uncheckedHandleIcon={<Handler>Blog</Handler>}
      checkedHandleIcon={<Handler>News</Handler>}
      uncheckedIcon={<Officon>News</Officon>}
      checkedIcon={<Officon>Blog</Officon>}
      // borderRadius={24}
      className="react-switch"
    />
  </SwitchWrapper>
);

SwitchBlogButton.defaultProps = {
  isFetching: false
};

SwitchBlogButton.propTypes = {
  isBlog: bool.isRequired,
  isFetching: bool,
  onChange: func.isRequired
};

export default SwitchBlogButton;
