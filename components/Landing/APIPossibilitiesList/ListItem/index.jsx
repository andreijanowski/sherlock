import React from "react";
import { string, bool } from "prop-types";

import { Trans } from "i18n";
import { useT } from "utils/hooks";
import { Container, Description, Image, ImageContainer, Title } from "./styled";
import { getStepImageWidth } from "../utils";

const ListItem = ({ step, isLastChild }) => {
  const t = useT("landing");
  return (
    <Container py={[40, null, null, 0]} isLastChild={isLastChild}>
      <Title>{t(`apiPossibilities.${step}.title`)}</Title>
      <ImageContainer width={getStepImageWidth(step)}>
        <Image src={`/static/img/apiPossibilities/${step}.gif`} alt={step} />
      </ImageContainer>
      <Description>
        <Trans
          t={t}
          i18nKey={`apiPossibilities.${step}.description`}
          components={[<strong />, <br />]}
        />
      </Description>
    </Container>
  );
};

ListItem.propTypes = {
  step: string.isRequired,
  isLastChild: bool.isRequired
};

export default ListItem;
