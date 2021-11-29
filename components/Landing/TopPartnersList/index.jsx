import React from "react";

import { Container, Logo } from "./styled";

const items = [
  "/static/img/topsection/cocaColaLogo.svg",
  "/static/img/topsection/nestleLogo.svg",
  "/static/img/topsection/haagenDazsLogo.svg",
  "/static/img/topsection/uberEatsLogo.svg"
];

const TopPartnersList = () => (
  <Container>
    {items.map(item => (
      <Logo key={item} src={item} />
    ))}
  </Container>
);

export default TopPartnersList;
