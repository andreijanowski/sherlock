import React from "react";

import styled from "styled-components";
import { string } from "prop-types";

const RoundedBrandmark = styled.img.attrs(({ icon }) => ({
  src: `/static/img/${icon}.png`
}))`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const LogoIcon = ({ icon }) => <RoundedBrandmark icon={icon} />;

LogoIcon.propTypes = {
  icon: string.isRequired
};

export default LogoIcon;
