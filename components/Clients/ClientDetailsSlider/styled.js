import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const SlideWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`;

export const ContentWrapper = styled.div`
  min-height: 100%;
  overflow: auto;
  padding: 38px 36px;
  background: rgb(${p => p.theme.colors.white});
  &:focus {
    outline: none;
  }
`;

export const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  background: rgb(${p => p.theme.colors.background});
`;

export const Name = styled.div`
  white-space: nowrap;
  color: rgb(${p => p.theme.colors.black});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: 36px;
  letter-spacing: 3.7px;
`;

export const MainInfoTags = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 27px;
`;

export const MainInfoTag = styled.li`
  padding: 0 16px;
  &:not(:last-child) {
    border-right: 1px solid rgb(${p => p.theme.colors.gray["3"]});
  }
`;

export const Section = styled(Box)`
  width: 100%;
  & + & {
    margin-top: 40px;
  }
`;

export const SectionTitle = styled.div`
  margin-bottom: 12px;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f16};
  color: rgb(${p => p.theme.colors.gray["2"]});
  line-height: 18px;
`;

export const PersonalInfoRow = styled(Flex).attrs({
  alignItems: "center",
  flexWrap: "nowrap"
})`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const PersonalInfoLabel = styled(Box).attrs({ width: "50%" })`
  font-weight: ${p => p.theme.fontWeights.thin};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 18px;
  color: rgb(${p => p.theme.colors.blue});
`;

export const PersonalInfoValue = styled(Box).attrs({ width: "50%" })`
  font-size: ${p => p.theme.fontSizes.f16};
  color: rgb(${p => p.theme.colors.darkText});
  line-height: 18px;
  word-break: break-all;
`;

export const Tags = styled(Flex).attrs({
  alignItems: "center",
  flexWrap: "wrap",
  mb: 24
})`
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Tag = styled(Box)`
  margin-right: 14px;
  padding: 8px 16px;
  border-radius: ${p => p.theme.radius.default};
  font-size: ${p => p.theme.fontSizes.f16};
  color: rgb(${p => p.theme.colors.darkText});
  line-height: 18px;
  text-transform: capitalize;
  ${p => p.blue && `background: rgba(${p.theme.colors.blue}, 0.3);`}
  ${p => p.pink && `background: rgba(${p.theme.colors.pink}, 0.3);`}
`;

export const Currency = styled(Box).attrs({ mb: 24 })`
  font-size: ${p => p.theme.fontSizes.f18};
  color: rgb(${p => p.theme.colors.blue});
  font-weight: ${p =>
    p.total ? p.theme.fontWeights.bold : p.theme.fontWeights.medium};
  line-height: 18px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetectiveLabel = styled(Flex).attrs({
  justifyContent: "center",
  alignItems: "center"
})`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 21px;
  color: rgb(${p => p.theme.colors.blue});
`;
