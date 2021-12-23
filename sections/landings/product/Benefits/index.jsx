import React from "react";
import { string } from "prop-types";
import { Flex } from "@rebass/grid";

import { Trans } from "i18n";
import { useT } from "utils/hooks";
import { getPrefix } from "../utils";
import {
  Container,
  H2Styled,
  Benefit,
  Percents,
  Hint,
  Description
} from "./styled";

const Benefits = ({ name }) => {
  const t = useT("landing");
  const prefix = getPrefix(name);

  const benefitsData = t(`${prefix}.benefits`, { returnObjects: true });

  return (
    <Container>
      <H2Styled mb={[32, null, null, 78]}>{t("benefitsInNumbers")}</H2Styled>
      <Flex
        width={1}
        flexDirection={["column", null, "row"]}
        alignItems={["center", null, "flex-end"]}
        flexWrap="wrap"
      >
        {benefitsData.map(benefit => (
          <Benefit key={benefit.description} width={[1, 1 / 2, null, 1 / 4]}>
            <Hint>{benefit.hint}</Hint>
            <Percents mb={3}>{benefit.percents}</Percents>
            <Description mb={[52, null, null, 0]}>
              <Trans t={t} components={[<br />]}>
                {benefit.description}
              </Trans>
            </Description>
          </Benefit>
        ))}
      </Flex>
    </Container>
  );
};

Benefits.propTypes = {
  name: string.isRequired
};

export default Benefits;
