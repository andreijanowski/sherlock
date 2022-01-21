import React from "react";
import { Box } from "@rebass/grid";
import { bool } from "prop-types";

import { Link } from "components";
import { useLng } from "utils/hooks";
import { Fork } from "components/Icons";
import { IconContainer, LogoContainer } from "./styled";

const FoodetectiveTextLogo = ({ isDark }) => {
  const lng = useLng();
  return (
    <Link route="/" lng={lng}>
      <LogoContainer as="a" isDark={isDark} alignItems="center">
        <IconContainer mr={1}>
          <Fork />
        </IconContainer>
        <Box>
          Foodetective <br />
          Business
        </Box>
      </LogoContainer>
    </Link>
  );
};

FoodetectiveTextLogo.propTypes = {
  isDark: bool
};

FoodetectiveTextLogo.defaultProps = {
  isDark: false
};

export default FoodetectiveTextLogo;
