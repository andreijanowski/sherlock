import React from "react";

import { useT } from "utils/hooks";
import { VideoPreview } from "components/Landing";
import { HOW_IT_WORKS_VIDEO_URL } from "consts";
import { Container, Description, Title } from "./styled";

const TopSection = () => {
  const t = useT("landing");
  return (
    <Container pt={[46, null, null, 100]} pb={52} px={3}>
      <Title>{t("landings.howItWorks.title")}</Title>
      <Description mx="auto" mb="48px">
        {t("landings.howItWorks.subtitle")}
      </Description>
      <VideoPreview
        width={["100%", null, null, 1033]}
        height="576"
        src={HOW_IT_WORKS_VIDEO_URL}
        poster="/static/img/howItWorks/videoBanner.png"
      />
    </Container>
  );
};

export default TopSection;
