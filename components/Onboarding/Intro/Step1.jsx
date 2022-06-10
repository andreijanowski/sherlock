import React, { useState } from "react";

import { Trans } from "i18n";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { useT } from "utils/hooks";
import {
  Bold,
  Breadcrumb,
  InfoWrapper,
  Hints,
  Hint,
  HintModal,
  HintTile,
  Image,
  Overlay,
  PreviewButtons,
  PreviewWrapper,
  Subtitle,
  Title,
  Wrapper
} from "./styled";

const Step1 = () => {
  const [hasHintOpen, setHasHintOpen] = useState(true);
  const t = useT("onboarding");

  const setHahandleCloseHint = () => setHasHintOpen(false);
  return (
    <Wrapper row>
      <InfoWrapper>
        <Breadcrumb>{t("intro.tiles.step1.header")}</Breadcrumb>
        <Title>{t("intro.step1.title")}</Title>
        <Subtitle>{t("intro.step1.subtitle")}</Subtitle>
        <Subtitle>{t("intro.step1.hints.header")}</Subtitle>
        <Hints>
          <Hint>{t("intro.step1.hints.first")}</Hint>
          <Hint>{t("intro.step1.hints.second")}</Hint>
          <Hint>{t("intro.step1.hints.third")}</Hint>
        </Hints>
        <HintTile>
          <b>{t("intro.step1.service.buttons")}</b>
          <Trans
            t={t}
            i18nKey="intro.step1.service.content"
            components={[<Bold />]}
          />
          <Image src="/static/img/onboarding/phonenav.png" fullWidth />
        </HintTile>
      </InfoWrapper>
      <PreviewWrapper scroll={!hasHintOpen}>
        {hasHintOpen && (
          <>
            <Overlay />
            <HintModal>
              {t("intro.step1.swipe")}
              <Image src="/static/img/onboarding/phonehint.svg" fullWidth />
              <Button
                onClick={setHahandleCloseHint}
                styleName="popup"
                withArrow
                variant={BUTTON_VARIANT.GRADIENT}
              >
                {t("intro.step1.gotit")}
              </Button>
            </HintModal>
          </>
        )}
        <Image src="/static/img/onboarding/liveapp.png" fullWidth />
        <PreviewButtons src="/static/img/onboarding/previewbuttons.png" />
      </PreviewWrapper>
    </Wrapper>
  );
};

export default Step1;
