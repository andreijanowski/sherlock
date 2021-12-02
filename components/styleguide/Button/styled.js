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
      return colors.buttonSecondary;
    case BUTTON_VARIANT.OUTLINE:
      return "transparent";
    default:
      return colors.blue;
  }
};

const getBorderColorByVariant = props => {
  const {
    theme: { colors },
    variant
  } = props;
  switch (variant) {
    case BUTTON_VARIANT.OUTLINE:
      return [colors.white, 1].join(", ");
    default:
      return [colors.white, 0].join(", ");
  }
};

export const ButtonContainer = styled(Flex)`
  padding: 7px 24px;
  justify-content: center;
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f22};
  border-radius: 24px;
  cursor: pointer;
  appearance: none;
  text-decoration: none;
  border: 1px solid rgba(${getBorderColorByVariant});
  box-shadow: none;
  background: rgb(${getColorByVariant});
  &:hover {
    box-shadow: none;
    background: rgba(${getColorByVariant}, 0.8);
  }
`;
