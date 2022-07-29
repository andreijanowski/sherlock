import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { BUTTON_VARIANT } from "./utils";

const getColorByVariant = props => {
  const {
    theme: { colors },
    variant
  } = props;
  switch (variant) {
    case BUTTON_VARIANT.SECONDARY:
      return `rgb(${colors.buttonSecondary})`;
    case BUTTON_VARIANT.OUTLINE:
    case BUTTON_VARIANT.NAKED:
      return "transparent";
    case BUTTON_VARIANT.B2BSECONDARY:
      return `rgb(${colors.landingDarkBlue})`;
    case BUTTON_VARIANT.GRADIENT:
      return colors.gradient;
    default:
      return `rgb(${colors.blue})`;
  }
};

const getBorderColorByVariant = props => {
  const {
    theme: { colors },
    variant
  } = props;
  switch (variant) {
    case BUTTON_VARIANT.OUTLINE:
      return `1px solid rgba(${[colors.white, 1].join(", ")})`;
    case BUTTON_VARIANT.NAKED:
      return "0";
    case BUTTON_VARIANT.GRADIENT:
      return `1px solid rgba(${colors.blue})`;
    default:
      return `1px solid rgba(${[colors.white, 0].join(", ")})`;
  }
};

export const ButtonContainer = styled(Flex)`
  padding: 7px 24px;
  justify-content: center;
  color: ${p => p.color || `rgb(${p.theme.colors.white})`};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f22};
  border-radius: 24px;
  cursor: pointer;
  appearance: none;
  text-decoration: none;
  border: ${getBorderColorByVariant};
  box-shadow: none;
  background: ${getColorByVariant};
  &:hover {
    box-shadow: none;
    background: rgba(${getColorByVariant}, 0.8);
  }
`;
