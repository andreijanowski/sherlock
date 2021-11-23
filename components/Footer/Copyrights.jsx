import React from "react";

import { FOODETECTIVE_ADDRESS } from "consts";
import { CopyrightsContainer } from "./styled";

const Logo = () => {
  const year = new Date().getFullYear();
  return (
    <CopyrightsContainer>
      {`Copyright © ${year} Foodetective. All rights reserved.`}
      <br />
      {FOODETECTIVE_ADDRESS}
    </CopyrightsContainer>
  );
};

export default Logo;
