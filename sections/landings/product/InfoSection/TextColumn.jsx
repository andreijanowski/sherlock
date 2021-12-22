import React from "react";
import { Box, Flex } from "@rebass/grid";
import { arrayOf, bool, number, oneOf, shape, string } from "prop-types";

import CheckmarkText from "components/Landing/CheckmarkText";
import { Trans } from "i18n";
import { useT } from "utils/hooks";
import { BodyStyled, H3Styled, List } from "./styled";

const TextColumn = ({
  width,
  prefix,
  isDark,
  activeOption,
  advantagesColumnsWidth
}) => {
  const t = useT("landing");

  const subtitle = t(`${prefix}.subtitle`);

  return (
    <Box width={width}>
      <H3Styled isDark={isDark} mb={2}>
        {subtitle}
      </H3Styled>
      <BodyStyled mb={5} isDark={isDark}>
        {activeOption.description}
      </BodyStyled>
      <Flex flexWrap="wrap" mx={-3}>
        {activeOption.advantages.map(adv => (
          <Box key={adv} width={advantagesColumnsWidth} px={3} mb={24}>
            <CheckmarkText isDark={isDark}>
              <Trans
                t={t}
                components={[
                  <strong />,
                  <div />, // todo add links support
                  <List>
                    <li />
                    <li />
                    <li />
                    <li />
                  </List>
                ]}
              >
                {adv}
              </Trans>
            </CheckmarkText>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

TextColumn.propTypes = {
  width: arrayOf(number).isRequired,
  prefix: string.isRequired,
  isDark: bool.isRequired,
  activeOption: shape().isRequired,
  advantagesColumnsWidth: arrayOf(oneOf([arrayOf(number), number, string]))
    .isRequired
};

export default TextColumn;
