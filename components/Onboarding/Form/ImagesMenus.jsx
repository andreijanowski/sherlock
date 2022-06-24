import React from "react";

import { useT } from "utils/hooks";
import { Content, Wrapper, Title, InfoWrapper, PreviewWrapper } from "./styled";

const ImagesMenus = () => {
  const t = useT("onboarding");

  return (
    <Wrapper>
      <Title>{t("app:manageProfile.picturesAndMenus")}</Title>
      <Content>
        <InfoWrapper>
          <b>Images & Menus</b>
        </InfoWrapper>
        <PreviewWrapper>
          <div>.</div>
        </PreviewWrapper>
      </Content>
    </Wrapper>
  );
};

export default ImagesMenus;
