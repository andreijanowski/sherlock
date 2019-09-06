import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  justifyContent: "space-between"
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
export const IconWrapper = styled(Flex).attrs(() => ({
  justifyContent: "center",
  alignItems: "center"
}))`
  width: 40px;
  height: 40px;
  color: rgb(${p => p.theme.colors.blue});
  background-color: rgba(${p => p.theme.colors.blue}, 0.1);
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgba(${p => p.theme.colors.blue}, 1);
  }
`;

export const EditIcon = styled(FontAwesomeIcon).attrs(() => ({
  icon: ["fa", "pen"]
}))`
  /* stylelint-disable-line no-empty-block */
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
  /* stylelint-disable-line no-empty-block */
`;
export const DetailContent = styled(Box).attrs(() => ({ width: 1 / 2, mb: 2 }))`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
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
`;
