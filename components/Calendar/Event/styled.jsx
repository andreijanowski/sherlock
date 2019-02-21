import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Text = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Wrapper = styled.div`
  border: 1px solid rgb(${p => p.theme.colors.white});
  border-radius: ${p => p.theme.radius.tiny};
  height: 100%;
  padding: 8px;
`;

export const Header = styled(Flex).attrs({
  justifyContent: "space-between"
})`
  padding-bottom: 24px;
  width: 400px;
`;
export const MainInfo = styled.div``;
export const Time = styled.div`
  color: rgb(${p => p.theme.colors.bombay});
  line-height: 24px;
`;
export const Name = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f24};
  font-weight: ${p => p.theme.fontWeights.bold};
  line-height: 32px;
`;
export const Price = styled.div`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f21};
  line-height: 32px;
`;
export const IconWrapper = styled(Flex).attrs({
  justifyContent: "center",
  alignItems: "center"
})`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(${p => p.theme.colors.blue}, 0.1);
  color: rgb(${p => p.theme.colors.blue});
  cursor: pointer;

  &:hover {
    background-color: rgba(${p => p.theme.colors.blue}, 1);
    color: rgb(${p => p.theme.colors.white});
  }
`;

export const EditIcon = styled(FontAwesomeIcon).attrs({
  icon: ["fa", "pen"]
})``;

export const Details = styled.div`
  margin: 0 -32px;
  border-top: 1px solid rgba(${p => p.theme.colors.blue}, 0.08);
  border-bottom: 1px solid rgba(${p => p.theme.colors.blue}, 0.08);
  padding: 24px 32px 16px;
`;
export const Detail = styled(Flex).attrs({ width: 1, alignItems: "center" })``;
export const DetailContent = styled(Box).attrs({ width: 1 / 2, mb: 2 })`
  color: rgb(${p => p.theme.colors.dark});
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
`;
export const AdditionalHeader = styled.div`
  padding: 24px 0 4px;
  color: rgb(${p => p.theme.colors.dark});
`;
export const AdditionalParagraph = styled.div`
  color: rgb(${p => p.theme.colors.bombay});
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
  margin-bottom: 16px;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 16px;
`;
