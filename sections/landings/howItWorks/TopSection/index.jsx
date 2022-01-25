import React from "react";

import { useT } from "utils/hooks";
import { Container, Description, Title } from "./styled";
import VideoPreview from "./VideoPreview";

const TopSection = () => {
  const t = useT("landing");
  return (
    <Container pt={[46, null, null, 100]} pb={52} px={3}>
      <Title>{t("landings.howItWorks.title")}</Title>
      <Description mx="auto" mb="48px">
        {t("landings.howItWorks.subtitle")}
      </Description>
      <VideoPreview />
    </Container>
  );
};

export default TopSection;
