import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { StyledButton } from "components";

export const Text = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Wrapper = styled.div`
  height: 100%;
  padding: 2px;
  border: 1px solid rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.tiny};
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 8px;
  }
`;

export const EventWrapper = styled(Wrapper)`
  margin-bottom: 8px;
  color: rgb(${p => p.theme.colors.white});
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 1.33;
  background-color: rgba(${p => p.theme.colors.blue}, 0.9);
  box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.blue}, 0.48);
  cursor: pointer;

  &:hover {
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;

export const Header = styled(Flex).attrs(() => ({
  justifyContent: "space-between",
  flexDirection: ["column", "row"]
}))`
  padding-bottom: 24px;
`;
export const MainInfo = styled.div`
  /* stylelint-disable-line no-empty-block */
`;
export const Time = styled.div`
  color: rgb(${p => p.theme.colors.bombay});
  line-height: 24px;
`;
export const Name = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: 32px;
`;
export const Price = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f21};
  line-height: 32px;
`;

export const Details = styled.div`
  margin: 0 -32px 16px;
  padding: 24px 32px 16px;
  border-top: 1px solid rgba(${p => p.theme.colors.blue}, 0.08);
  border-bottom: 1px solid rgba(${p => p.theme.colors.blue}, 0.08);
`;
export const Detail = styled(Flex).attrs(() => ({
  width: 1,
  alignItems: "center"
}))`
  justify-content: space-between;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
  }
`;
export const DetailName = styled(Box).attrs(() => ({
  width: [1, 1 / 3],
  mb: [0, 2]
}))`
  color: rgb(${p => p.theme.colors.brightGray});
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
  @media (max-width: 640px) {
    color: rgb(${p => p.theme.colors.importGray});
    font-size: ${p => p.theme.fontSizes.f12};
  }
`;

export const DetailContent = styled(DetailName).attrs(() => ({
  width: 2 / 3,
  mb: 2
}))`
  color: rgb(${p => p.theme.colors.dark});
  text-align: right;
  @media (max-width: 640px) {
    text-align: left;
    color: rgb(${p => p.theme.colors.dark});
    font-size: ${p => p.theme.fontSizes.f14};
  }
`;
export const AdditionalHeader = styled.div`
  padding: 8px 0 4px;
  color: rgb(${p => p.theme.colors.dark});
`;
export const AdditionalParagraph = styled.div`
  margin-bottom: 16px;
  color: rgb(${p => p.theme.colors.bombay});
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
`;

export const ModalContentWrapper = styled.div`
  min-width: 450px;
  @media (max-width: 640px) {
    min-width: calc(100vw - 64px);
  }
`;

export const ExtendedButton = styled(StyledButton)`
  @media (max-width: 640px) {
    margin: auto;
    height: 36px;
    font-size: ${p => p.theme.fontSizes.f14};
    ${"" /* line-height: ${p => p.theme.fontSizes.f14}; */}
  }
`;
