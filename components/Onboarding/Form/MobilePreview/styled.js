import styled from "styled-components";
import { Box } from "@rebass/grid";

export const PreviewWrapper = styled(Box)`
  position: relative;
  margin: 10px 100px;
  border-radius: 28px;
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  width: 268px;
  min-width: 268px;
  height: 580px;
  overflow: ${p => (p.scroll ? "scroll" : "hidden")};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Placeholder = styled.div`
  border-radius: 24px;
  width: 100%;
  height: 100%;
  background-color: rgb(${p => p.theme.colors.detectivesBackgroundGrey});
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 16px 10px;
`;

export const Image = styled.div`
  width: 100%;
  height: 187px;

  > div {
    border-radius: 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Name = styled.div`
  display: inline-block;
  position: relative;
  width: 220px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25.2px;
  word-wrap: break-word;
  margin-bottom: -3px;

  > div {
    position: absolute;
    bottom: 3px;
    width: 110px;
    height: 18px;
  }
`;

export const Logo = styled.div`
  position: relative;
  display: flex;
  width: 22px;
  height: 22px;
`;

export const TagsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Tag = styled.div`
  width: auto;
  margin: 4px 3px 7px 0;
  height: 9px;
  font-weight: 400;
  font-size: 10px;

  > div {
    width: 50px;
  }
`;

export const Hours = styled.div`
  width: auto;
  margin-bottom: 20px;
  height: 9px;
  font-weight: 400;
  font-size: 10px;

  > div {
    width: 156px;
  }
`;

export const HoursWrapper = styled.span`
  display: flex;
  position: relative;
  align-items: center;

  img {
    top: -2px;
    left: 0;
  }

  span:nth-child(3) {
    text-decoration: underline;
  }
`;

export const Green = styled.span`
  margin-left: 16px;
  color: rgb(${p => p.theme.colors.greenHaze});
`;

export const FeaturesWrapper = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid rgb(${p => p.theme.colors.border});
  border-bottom: 1px solid rgb(${p => p.theme.colors.border});
  padding-top: 12px;
  padding-bottom: 25px;
  justify-content: space-around;
`;

export const Feature = styled.div`
  > div {
    width: 28px;
    height: 28px;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const Icon = styled.div`
  border: 1px solid rgb(${p => p.theme.colors.black});
  border-radius: 50%;
  width: 28px;
  height: 28px;
`;

export const FeatureName = styled.p`
  position: absolute;
  bottom: -25px;
  font-size: 8px;
`;

export const IconImg = styled.img`
  position: absolute;
  top: 7px;
  left: 7px;
  width: 14px;
  height: 14px;
`;

export const ReadMore = styled.div`
  display: flex;
  width: 100%;
`;

export const Placeholders = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    height: 9px;
    margin-bottom: 5px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid rgb(${p => p.theme.colors.border});

  > div {
    width: 100%;
  }

  p {
    width: 65px;
    height: 9px;
    margin: 9px 0 0;
  }
`;
