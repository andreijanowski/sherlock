import React, { Fragment } from "react";
import { Box, Flex } from "@rebass/grid";
import { arrayOf, bool, func, number, oneOf, shape, string } from "prop-types";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import CheckmarkText from "components/Landing/CheckmarkText";
import { Trans } from "i18n";
import { useT } from "utils/hooks";
import {
  BodyStyled,
  H3Styled,
  List,
  ToggleOptionButton,
  ToggleOptionButtonIcon
} from "./styled";

const TextColumn = ({
  width,
  prefix,
  isDark,
  activeOptionIndex,
  advantagesColumnsWidth,
  options,
  setActiveOptionIndex
}) => {
  const t = useT("landing");

  const subtitle = t(`${prefix}.subtitle`);
  const hasOptionsSwitcher = options.length > 1;

  return (
    <Box width={width}>
      <H3Styled isDark={isDark} mb={[3, null, null, 2]} tabletCentered>
        {subtitle}
      </H3Styled>
      {options.map((option, index) => {
        const isActive = index === activeOptionIndex;
        const onButtonClick = () => {
          setActiveOptionIndex(index);
        };

        return (
          <Fragment key={option.title}>
            {hasOptionsSwitcher && (
              <ToggleOptionButton
                display={["flex", null, null, "none"]}
                isActive={isActive}
                onClick={isActive ? undefined : onButtonClick}
              >
                {option.title}
                <ToggleOptionButtonIcon
                  icon={isActive ? faChevronUp : faChevronDown}
                />
              </ToggleOptionButton>
            )}
            {isActive && (
              <>
                <BodyStyled
                  mb={[4, null, null, 5]}
                  isDark={isDark}
                  tabletCentered
                >
                  {option.description}
                </BodyStyled>
                <Flex flexWrap="wrap" mx={-3}>
                  {option.advantages.map(adv => (
                    <Box
                      key={adv}
                      width={advantagesColumnsWidth}
                      px={3}
                      mb={24}
                    >
                      <CheckmarkText isDark={isDark}>
                        <Trans
                          t={t}
                          components={[
                            <strong />,
                            <strong />,
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
              </>
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};

TextColumn.propTypes = {
  width: arrayOf(number).isRequired,
  prefix: string.isRequired,
  isDark: bool.isRequired,
  activeOptionIndex: number.isRequired,
  advantagesColumnsWidth: arrayOf(oneOf([arrayOf(number), number, string]))
    .isRequired,
  options: arrayOf(shape({ title: string.isRequired })).isRequired,
  setActiveOptionIndex: func.isRequired
};

export default TextColumn;