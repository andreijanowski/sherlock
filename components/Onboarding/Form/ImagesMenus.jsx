import React from "react";

import { useT } from "utils/hooks";
import { MobilePreview } from "components/Onboarding";
import { Content, Wrapper, Title, InfoWrapper } from "./styled";

const ImagesMenus = () => {
  const t = useT("onboarding");

  return (
    <Wrapper>
      <Title>{t("app:manageProfile.picturesAndMenus")}</Title>
      <Content>
        <InfoWrapper>
          <b>Images & Menus</b>
        </InfoWrapper>
        <MobilePreview />
      </Content>
    </Wrapper>
  );
};

export default ImagesMenus;
