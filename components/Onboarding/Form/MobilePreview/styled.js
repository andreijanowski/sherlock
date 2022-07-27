import styled from "styled-components";
import { Box } from "@rebass/grid";

export const PreviewWrapper = styled(Box)`
  position: relative;
  margin: -48px 55px 50px;
  border-radius: 28px;
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  width: 268px;
  min-width: 268px;
  height: 580px;
  overflow: ${p => (p.scroll ? "scroll" : "hidden")};
  -ms-overflow-style: none;
  scrollbar-width: none;
  transform: translateZ(0);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PreviewButtons = styled.img`
  width: 100%;
  position: sticky;
  cursor: pointer;
  bottom: 0;
  left: 0;
  z-index: 1;
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
  position: relative;
  width: 100%;
  height: 187px;

  > div {
    border-radius: 0;
  }
`;

export const LiveInfo = styled.span`
  position: absolute;
  display: block;
  top: 12px;
  left: 0;
  background-color: rgb(${p => p.theme.colors.blue});
  color: rgb(${p => p.theme.colors.white});
  font-size: 12px;
  padding: 6px 9px;
  border-radius: 0 34px 34px 0;
`;

export const Picture = styled.img`
  width: 100%;
  height: 187px;
  object-fit: cover;
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

export const LogoImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
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

export const Price = styled.p`
  font-size: 10px;
  margin: 0;
  margin-bottom: 5px;
  color: rgb(${p => p.theme.colors.black});

  span {
    color: rgb(${p => p.theme.colors.mischka});
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
  margin-right: 11px;

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
  font-weight: 500;
  font-size: 10px;
  text-decoration: underline;
  margin-top: 5px;
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
  font-weight: 400;
  font-size: 10px;
  line-height: 140%;
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid rgb(${p => p.theme.colors.border});

  > div {
    width: 100%;
  }

  > p {
    overflow: hidden;
    max-height: 30px;
    margin: 0;
  }

  b {
    width: 65px;
    height: 9px;
    margin: 9px 0 0;
  }
`;

export const MustTrySection = styled.div`
  padding: 12px 0 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid rgb(${p => p.theme.colors.border});
`;

export const MustTry = styled.span`
  font-weight: 600;
  font-size: 12px;
`;

export const OrderNow = styled.button`
  border: 1px solid rgb(${p => p.theme.colors.black});
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: 16px;
  font-size: 8.5px;
  padding: 4px 10px 2px;
`;

export const Products = styled.div`
  display: flex;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 95px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProductName = styled.p`
  font-size: 8px;
  color: rgb(${p => p.theme.colors.blue});
  margin: 6px 0;
`;

export const Reviews = styled.div`
  padding: 12px 0 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid rgb(${p => p.theme.colors.border});
`;

export const Review = styled.div`
  min-width: 180px;
  height: 120px;
  border-radius: 8px;
  margin: 8px 8px 12px 0;

  > div {
    border-radius: 8px;
  }
`;

export const RevealButtonWrapper = styled.div`
  position: relative;
  border-radius: 24px;
  padding: 4px 0 2px;
  min-height: 26px;
  margin-top: 10px;

  > div {
    position: relative;
    width: 100%;
    z-index: 1;
    min-height: 26px;
  }
`;

export const RevealButton = styled.button`
  position: relative;
  width: 100%;
  border: 1px solid rgb(${p => p.theme.colors.black});
  background-color: rgb(${p => p.theme.colors.white});
  border-radius: 24px;
  font-size: 10px;
  min-height: 26px;
  padding: 2px auto;
`;

export const AddInfo = styled.div`
  padding: 12px 0 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid rgb(${p => p.theme.colors.border});
`;

export const Info = styled.div`
  font-size: 10px;
  margin-bottom: 5px;

  > div {
    position: relative;
    max-width: 50px;
    min-height: 9px;
  }
`;

export const Media = styled.div`
  padding: 12px 0 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: -60px;
`;

export const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 8px;

  div {
    width: 109px;
    height: 17px;
  }

  div:nth-child(2) {
    width: 69px;
  }
`;

// stylelint-disable

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;

  & > div {
    width: 100px;
    height: 95px;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  & > div:nth-child(2) {
    width: 65px;
    height: 9px;
  }
`;

// stylelint-enable
