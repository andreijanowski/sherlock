import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const PlansWrapper = styled(Flex).attrs({
  flexDirection: "row",
  m: -2,
  width: 1,
  alignSelf: "center"
})`
  max-width: 1184px;
`;

export const TextWrapper = styled(Flex).attrs({
  width: 1,
  flexDirection: "column",
  alignSelf: "center",
  mb: 58
})`
  max-width: 896px;
`;

export const MainWrapper = styled(Flex).attrs({
  flexDirection: "column",
  m: 2,
  pb: 3
})`
  position: relative;
  border-radius: ${p => p.theme.radius.default};
  background: rgba(${p => p.theme.colors.dark}, 0.1);
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;

export const NameWrapper = styled(Flex).attrs({
  flexDirection: "row"
})`
  position: absolute;
  top: -10px;
  left: 16px;
`;

export const Name = styled.div`
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.dark}, 0.08);
  background: rgb(${p => p.theme.colors.white});
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: 700;
  line-height: 1.15;
  padding: 2px 8px;
  color: rgb(${p => p.theme.colors[p.color]});
`;

export const MostPopular = styled.div`
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: 700;
  line-height: 1.15;
  padding: 0 6px;
  border: ${p => p.theme.borderWeights.tiny} solid
    rgb(${p => p.theme.colors[p.color]});
  border-radius: ${p => p.theme.radius.default};
  background: rgb(${p => p.theme.colors.white});
  color: rgb(${p => p.theme.colors[p.color]});
  margin-left: 8px;
`;

export const PriceWrapper = styled(Flex).attrs({
  flexDirection: "column",
  mb: 3
})`
  padding: 24px 16px 16px;
  border-radius: ${p => p.theme.radius.default};
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
  background: rgb(${p => p.theme.colors.white});
`;

export const PriceDescription = styled.div`
  color: rgba(${p => p.theme.colors.dark}, 0.8);
  font-weight: 500;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
`;

export const Price = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: 600;
  font-size: ${p => p.theme.fontSizes.f36};
  line-height: 1.333;
  margin-bottom: 40px;
`;

export const Service = styled(Box).attrs({ mb: 1 })`
  text-align: center;
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: 500;
  line-height: 1.5;
  color: rgba(${p => p.theme.colors.dark}, 0.8);
`;

export const Badge = styled.span`
  padding: 2px 8px;
  color: rgb(${p => p.theme.colors[p.color]});
  background: rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.default};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 1.15;
  font-weight: 700;
  margin-right: 4px;
`;

export const ManagersWrapper = styled(Flex).attrs({
  width: 1,
  alignItems: "center",
  justifyContent: "space-between",
  mb: 2
})`
  background: rgba(${p => p.theme.colors[p.color]}, 0.1);
  padding: 12px 16px;
  border-radius: ${p => p.theme.radius.default};
`;

export const Icon = styled.div`
  border: ${p => p.theme.borderWeights.tiny} solid
    rgba(${p => p.theme.colors[p.color]}, ${p => (p.disabled ? "0.16" : "0.4")});
  border-radius: 100%;
  color: ${p =>
    p.disabled
      ? `rgba(${p.theme.colors[p.color]}, 0.4)`
      : `rgb(${p.theme.colors[p.color]})`};
  font-size: ${p => p.theme.fontSizes.f18};
  font-weight: 500;
  text-align: center;
  line-height: 1;
  width: 22px;
  height: 22px;
`;

export const ManagersText = styled.div`
  color: rgb(${p => p.theme.colors[p.color]});
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  font-weight: 500;
`;

export const Option = styled(Box)`
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
  font-weight: 500;
  color: ${p =>
    p.dark
      ? `rgba(${p.theme.colors.dark}, 0.4)`
      : `rgb(${p.theme.colors.blue})`};
`;
