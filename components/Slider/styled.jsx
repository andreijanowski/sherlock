import styled from "styled-components";

export const Name = styled.div`
  color: rgb(${p => p.theme.colors.bombay});
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 1.5;
`;

export const Value = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 1.5;
`;

export const Spacer = styled.div`
  width: calc(100% + 64px);
  height: 1px;
  margin: 8px -32px 24px -32px;
  background-color: rgb(${p => p.theme.colors.linkWaterDark});
`;

export const Header = styled.h2`
  margin: 0;
  padding-bottom: 32px;
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
`;

export const Subheader = styled(Header)`
  ${p => p.isDetails && "display: flex; justify-content: space-between;"}
  padding-bottom: 16px;
  font-size: ${p => p.theme.fontSizes.f18};
`;

export const DetailWrapper = styled.div`
  margin: 0 -32px;
  padding: 8px 32px;
  ${p =>
    p.onClick &&
    `cursor: pointer; &:hover {
    background-color: rgb(${p.theme.colors.iceBlue});
  }`}
`;
