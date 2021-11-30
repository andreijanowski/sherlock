import React from "react";
import { Box } from "@rebass/grid";

import { useT } from "utils/hooks";
import { H2, Subtitle } from "components/styleguide/Typography";
import { APIPossibilitiesList } from "components/Landing";
import { Container } from "./styled";

const DevelopersAndApi = () => {
  const t = useT("landing");
  return (
    <Container pt="50px" pb="180px">
      <Box width={[1, 1 / 2]} mb={5}>
        <H2>{t("unifiedApiSection.title")}</H2>
        <Subtitle>{t("unifiedApiSection.description")}</Subtitle>
      </Box>
      <APIPossibilitiesList />
    </Container>
  );
};

export default DevelopersAndApi;
