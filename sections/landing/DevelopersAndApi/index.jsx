import React from "react";
import { Box } from "@rebass/grid";

import { useT } from "utils/hooks";
import { H2, Subtitle } from "components/styleguide/Typography";
import { APIPossibilitiesList } from "components/Landing";
import { Container } from "./styled";

const DevelopersAndApi = () => {
  const t = useT("landing");
  return (
    <Container pt="50px" px={3} pb={[40, null, null, "180px"]}>
      <Box
        width={[1, null, null, 1 / 2]}
        mx={["auto", null, null, 0]}
        mb={[0, null, null, 5]}
      >
        <H2 tabletCentered>{t("unifiedApiSection.title")}</H2>
        <Subtitle tabletCentered>{t("unifiedApiSection.description")}</Subtitle>
      </Box>
      <APIPossibilitiesList />
    </Container>
  );
};

export default DevelopersAndApi;
