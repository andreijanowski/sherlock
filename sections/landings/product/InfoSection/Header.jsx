import React from "react";
import { Box } from "@rebass/grid";
import { string, number, bool, arrayOf, shape, func } from "prop-types";

import ButtonsBar from "components/styleguide/ButtonsBar";
import { themeGet } from "utils/theme";
import { useT } from "utils/hooks";
import { AdaptiveBox } from "components/styleguide/common";
import { H2Styled, TitleIcon } from "./styled";

const Header = ({
  isDark,
  icon,
  prefix,
  options,
  activeOptionIndex,
  setActiveOptionIndex
}) => {
  const t = useT("landing");

  const title = t(`${prefix}.title`, "");
  const hasOptionsSwitcher = options.length > 1;

  return (
    <>
      {title && (
        <H2Styled
          isDark={isDark}
          mb={hasOptionsSwitcher ? 4 : [4, null, null, 80]}
          justifyContent="center"
          alignItems="center"
        >
          {icon && (
            <Box as={TitleIcon} isDark={isDark} mr={14}>
              {icon}
            </Box>
          )}
          {title}
        </H2Styled>
      )}
      {hasOptionsSwitcher && (
        <AdaptiveBox
          display={["none", null, null, "block"]}
          mb={88}
          textAlign="center"
          mx="auto"
        >
          <ButtonsBar
            primaryColor={themeGet("colors.landingDarkBlue")}
            secondaryColor={themeGet("colors.white")}
            onChange={setActiveOptionIndex}
            value={activeOptionIndex}
            items={options.map((option, index) => ({
              label: option.title,
              value: index
            }))}
          />
        </AdaptiveBox>
      )}
    </>
  );
};

Header.propTypes = {
  isDark: bool.isRequired,
  icon: string,
  prefix: string.isRequired,
  options: arrayOf(shape({ title: string.isRequired })).isRequired,
  activeOptionIndex: number.isRequired,
  setActiveOptionIndex: func.isRequired
};

Header.defaultProps = {
  icon: null
};

export default Header;
