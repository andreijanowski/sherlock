import React from "react";

import { socialsConfig } from "./utils";
import { SocialsContainer, SocialsItem, SocialsItemLink } from "./styled";

const Socials = () => (
  <SocialsContainer>
    {socialsConfig.map(({ icon, href }) => (
      <SocialsItem key={href}>
        <SocialsItemLink href={href} target="_blank" rel="noreferrer noopener">
          <img src={icon} alt="" />
        </SocialsItemLink>
      </SocialsItem>
    ))}
  </SocialsContainer>
);

export default Socials;
