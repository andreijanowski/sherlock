import React from "react";
import { func, bool, string } from "prop-types";
import { Link } from "components";
import { IconWrapper } from "./styled";

const MainIcon = ({ Icon, lng, onClick, isMobileNavOpen, route }) =>
  route ? (
    <Link {...{ lng, route }}>
      <IconWrapper {...{ onClick, mainActive: isMobileNavOpen, main: true }}>
        <Icon />
      </IconWrapper>
    </Link>
  ) : (
    <IconWrapper {...{ onClick, mainActive: isMobileNavOpen, main: true }}>
      <Icon />
    </IconWrapper>
  );

MainIcon.propTypes = {
  onClick: func,
  isMobileNavOpen: bool,
  Icon: func.isRequired,
  lng: string,
  route: string
};

MainIcon.defaultProps = {
  onClick: null,
  isMobileNavOpen: false,
  route: null,
  lng: null
};

export default MainIcon;
