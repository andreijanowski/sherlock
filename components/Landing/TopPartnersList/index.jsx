import React from "react";
import { Box } from "@rebass/grid";

import { Container, Logo } from "./styled";

const items = [
  "/static/img/topsection/cocaColaLogo.svg",
  "/static/img/topsection/nestleLogo.svg",
  "/static/img/topsection/haagenDazsLogo.svg",
  "/static/img/topsection/uberEatsLogo.svg"
];

const TopPartnersList = () => (
  <Container>
    {items.map((item, index) => {
      const isLastChild = index === items.length - 1;
      return (
        <Box key={item} mr={[isLastChild ? 0 : 3, 0]}>
          <Logo key={item} src={item} />
        </Box>
      );
    })}
  </Container>
);

export default TopPartnersList;
