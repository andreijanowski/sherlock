import React, { Fragment } from "react";
import { Box, Flex } from "@rebass/grid";
import {
  arrayOf,
  bool,
  func,
  number,
  oneOf,
  shape,
  string,
  node
} from "prop-types";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import CheckmarkText from "components/Landing/CheckmarkText";
import { Trans } from "i18n";
import { useT } from "utils/hooks";
import {
  BodyStyled,
  H3Styled,
  LinkStyled,
  List,
  ToggleOptionButton,
  ToggleOptionButtonIcon,
  Step
} from "./styled";
import { getAdvPrefix, getDescriptionPrefix } from "../utils";

const TextColumn = ({
  width,
  prefix,
  isDark,
  activeOptionIndex,
  advantagesColumnsWidth,
  options,
  setActiveOptionIndex,
  textLinks,
  step,
  ctaButton,
  isAdvantagesCentered
}) => {
  const t = useT("landing");

  const hasOptionsSwitcher = options.length > 1;

  return (
    <Box width={width}>
      {step && (
        <Step isDark={isDark} mb={0} tabletCentered>
          {t("step", { step })}
        </Step>
      )}
      <H3Styled isDark={isDark} mb={[3, null, null, 2]} tabletCentered>
        <Trans t={t} i18nKey={`${prefix}.subtitle`} components={[<br />]} />
      </H3Styled>
      {options.map((option, index) => {
        const isActive = index === activeOptionIndex;
        const onButtonClick = () => {
          setActiveOptionIndex(index);
        };

        const descriptionPrefix = getDescriptionPrefix(index);
        const descriptionLinks = textLinks[descriptionPrefix] || [];

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
                  <Trans
                    t={t}
                    components={[<strong />]
                      .concat(
                        descriptionLinks.map(linkProps => (
                          <LinkStyled isDark={isDark} {...linkProps}>
                            {linkProps.href}
                          </LinkStyled>
                        ))
                      )
                      .concat([<br />])}
                  >
                    {option.description}
                  </Trans>
                </BodyStyled>
                <Flex flexWrap="wrap" mx={-3}>
                  {option.advantages.map((adv, advIndex) => {
                    const advPrefix = getAdvPrefix({
                      optionIndex: index,
                      advIndex
                    });
                    const advLink = textLinks[advPrefix];

                    return (
                      <Box
                        key={adv}
                        width={advantagesColumnsWidth}
                        px={3}
                        mb={24}
                      >
                        <CheckmarkText
                          isDark={isDark}
                          isCentered={isAdvantagesCentered}
                        >
                          <Trans
                            t={t}
                            components={[
                              <strong />,
                              advLink ? (
                                <LinkStyled isDark={isDark} {...advLink}>
                                  {advLink.href}
                                </LinkStyled>
                              ) : (
                                <strong />
                              ),
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
                    );
                  })}
                </Flex>
              </>
            )}
          </Fragment>
        );
      })}
      {ctaButton && (
        <Flex
          flexDirection="column"
          alignItems={["center", null, null, "flex-start"]}
          mt={[3, null, null, "48px"]}
        >
          {ctaButton}
        </Flex>
      )}
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
  setActiveOptionIndex: func.isRequired,
  textLinks: shape({}),
  step: number,
  ctaButton: node,
  isAdvantagesCentered: bool
};

TextColumn.defaultProps = {
  step: null,
  textLinks: {},
  ctaButton: null,
  isAdvantagesCentered: false
};

export default TextColumn;
