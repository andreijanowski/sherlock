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
    default:
      return colors.blue;
  }
};

export const ButtonContainer = styled(Flex)`
  padding: 8px 24px;
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f22};
  border-radius: 24px;
  cursor: pointer;
  appearance: none;
  text-decoration: none;
  border: none;
  box-shadow: none;
  background: rgb(${getColorByVariant});
  &:hover {
    box-shadow: none;
    background: rgba(${getColorByVariant}, 0.8);
  }
`;
