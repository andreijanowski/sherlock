import styled from "styled-components";
import { Box } from "@rebass/grid";

export const Wrapper = styled(Box).attrs({
  py: 35,
  px: 4,
  mx: -3
})`
  position: relative;
  background: rgb(${p => p.background || p.theme.colors.white});
`;

export const StyledHeading = styled(Box).attrs(p => ({
  as: "h3",
  mb: 3,
  mt: p.mt || 0
}))`
  color: rgb(${p => p.color || p.theme.colors.darkGreyText});
  font-size: ${p => p.theme.fontSizes.f30};
  font-weight: ${p => (p.bold ? "bold" : "600")};
  letter-spacing: 0.6px;
  line-height: 28px;
  margin: 6px 0;
`;

export const DetectiveImage = styled(Box)`
  width: 210px;
  height: 210px;
  background-image: ${props => (props.src ? `url(${props.src})` : "none")};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  transition: 0.17s ease-out;

  &:hover {
    box-shadow: 0 10px 90px 0 rgba(83, 83, 83, 0.5);
    text-decoration: none;
  }
`;

export const DetectiveName = styled.div`
  color: rgb(${p => p.theme.colors.blue});
  font-size: ${p => p.theme.fontSizes.f13};
  font-weight: ${p => p.theme.fontWeights.bold};
  margin-bottom: 6px;
  letter-spacing: 0.26px;
`;

export const DetectiveReviews = styled.div`
  color: rgb(${p => p.theme.colors.lightGreyText});
  font-size: ${p => p.theme.fontSizes.f13};
  font-weight: ${p => p.theme.fontWeights.thin};
  margin-bottom: 8px;
  letter-spacing: 0.26px;
`;
