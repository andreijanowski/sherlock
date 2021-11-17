import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

import { Button } from "components";

export const PlanContainer = styled.div`
  display: inline-block;
  margin: auto;
`;

export const PlanLabel = styled.div`
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f16};
  color: rgb(${p => p.color});
`;

export const PlanMostPopular = styled(Flex).attrs({
  alignItems: "center"
})``;

export const PlanMostPopularIcon = styled.div`
  color: rgb(${p => p.theme.colors.plansCaptionBlue});
`;

export const PlanMostPopularLabel = styled.div`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: 8px;
  line-height: 10px;
  color: rgb(${p => p.theme.colors.textDarkBlue});
`;

export const PlanPrice = styled.div`
  color: rgb(${p => p.color});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f32};
  line-height: ${p => p.theme.fontSizes.f32};
  white-space: nowrap;
`;

export const PlanPeriod = styled(Box)`
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: ${p => p.theme.fontSizes.f15};
  color: rgb(${p => p.theme.colors.gray["4"]});
  white-space: nowrap;
`;

export const PlansButton = styled(Button).attrs({
  styleName: "becomePartner"
})`
  margin: 0 auto;
  background-color: rgb(${p => p.color});
  &:hover,
  &:focus {
    background-color: rgba(${p => p.color}, 0.7);
  }
`;
