import React from "react";
import { string } from "prop-types";

import { Trans } from "i18n";
import { useT } from "utils/hooks";
import { Description, Image, ImageContainer, Title } from "./styled";

const ListItem = ({ step }) => {
  const t = useT("landing");
  return (
    <div>
      <Title>{t(`apiPossibilities.${step}.title`)}</Title>
      <ImageContainer>
        <Image src={`/static/img/apiPossibilities/${step}.gif`} alt={step} />
      </ImageContainer>
      <Description>
        <Trans
          t={t}
          i18nKey={`apiPossibilities.${step}.description`}
          components={[<strong />]}
        />
      </Description>
    </div>
  );
};

ListItem.propTypes = {
  step: string.isRequired
};

export default ListItem;
