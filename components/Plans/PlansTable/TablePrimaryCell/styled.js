import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const PrimaryCellContainer = styled.div`
  position: relative;
`;

export const PrimaryCellIcon = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  ${p =>
    p.isComingSoon
      ? `
      svg .primary {
        color: rgb(${p.theme.colors.gray["4"]});
      }
      svg .secondary {
        color: rgb(${p.theme.colors.gray["3"]});
      }
      `
      : `
      svg .primary {
        color: rgb(${p.theme.colors.blue});
      }
      svg .secondary {
        color: rgb(${p.theme.colors.menuDarkBlue});
      }
  `}
`;

export const PrimaryCellLabel = styled(Flex)`
  align-items: center;
  position: relative;
  margin-left: 30px;
  color: rgb(${p => p.theme.colors.gray[p.isComingSoon ? "4" : "3"]});
  white-space: nowrap;
`;

export const PrimaryCellComingSoon = styled.div`
  margin-left: 30px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f10};
  line-height: 6px;
  color: rgb(${p => p.theme.colors.blue});
`;
