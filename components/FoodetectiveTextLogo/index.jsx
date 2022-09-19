import React from "react";
import { Box } from "@rebass/grid";
import { bool } from "prop-types";

import { Link } from "components";
import { useLng } from "utils/hooks";
import { Fork } from "components/Icons";
import { IconContainer, LogoContainer, Business } from "./styled";

const FoodetectiveTextLogo = ({ isDark, hasIcon }) => {
  const lng = useLng();
  return (
    <Link route="/" lng={lng}>
      <LogoContainer as="a" isDark={isDark} alignItems="center">
        {hasIcon && (
          <IconContainer mr={1}>
            <Fork />
          </IconContainer>
        )}
        <Box>
          Foodetective <br />
          {hasIcon ? <span>Business</span> : <Business>For Business</Business>}
        </Box>
      </LogoContainer>
    </Link>
  );
};

FoodetectiveTextLogo.propTypes = {
  isDark: bool,
  hasIcon: bool
};

FoodetectiveTextLogo.defaultProps = {
  isDark: false,
  hasIcon: false
};

export default FoodetectiveTextLogo;
