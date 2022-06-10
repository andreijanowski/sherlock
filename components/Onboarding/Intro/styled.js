import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  justifyContent: "space-between"
}))`
  position: relative;
  max-height: 60vh;
  overflow: scroll;
  display: flex;
  flex-direction: ${p => (p.row ? "row" : "column")};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.h2`
  font-size: 36px;
  text-align: center;
`;

export const Blue = styled.span`
  color: rgb(${p => p.theme.colors.blue});
`;

export const Image = styled.img`
  margin: ${p => p.margin || 0};
  width: ${p => (p.fullWidth ? "100%" : "auto")};
`;

export const TilesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StepTile = styled.div`
  margin: 32px auto 46px;
  box-shadow: 34px 18px 66px rgba(170, 172, 175, 0.15),
    7.75433px 25px 69px rgba(69, 71, 75, 0.15);
  border-radius: 16px;
  width: 375px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TileHeader = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 140%;
  font-weight: 400;
  padding: 24px 32px;
  border-radius: 16px 16px 0 0;
  background: ${p => p.theme.colors.gradient};
  color: rgb(${p => p.theme.colors.white});
`;

export const StyledH3 = styled.h3`
  font-weight: 600;
  font-size: 24px !important;
  color: rgb(${p => p.theme.colors.white});
`;

export const Breadcrumb = styled.p`
  font-weight: 700;
  font-size: 18px !important;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin: 0;
`;

export const Title = styled.h4`
  font-weight: 700;
  font-size: 24px !important;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin: 10px 0;
`;

export const Subtitle = styled.p`
  font-weight: 600;
  font-size: 18px !important;
  color: rgb(${p => p.theme.colors.b2bSecondary});
  margin: 32px 0;
  max-width: 400px;
`;

export const InfoWrapper = styled(Box)`
  margin: 10px auto;
`;

export const PreviewWrapper = styled(Box)`
  position: relative;
  margin: 10px 100px;
  border-radius: 28px;
  border: 1px solid rgb(${p => p.theme.colors.snuff});
  width: 268px;
  height: 580px;
  overflow: ${p => (p.scroll ? "scroll" : "hidden")};
  -ms-overflow-style: none;
  scrollbar-width: none;

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

export const Hints = styled.ul`
  width: 100%;
  margin-top: -15px;
`;

export const Hint = styled.li`
  width: 100%;
  margin: 25px;
  margin-left: -15px;
  font-weight: 400;
  font-size: 14px;
  list-style-type: "✓";
  padding-left: 15px;

  &::marker {
    color: rgb(${p => p.theme.colors.blue});
  }
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 510px;
  background-color: rgba(${p => p.theme.colors.blackDark}, 0.4);
`;

export const HintModal = styled.div`
  position: absolute;
  top: 150px;
  left: 25px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 16px 24px;
  width: 215px;
  height: 250px;
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  z-index: 1;
  border-radius: 16px;
  margin: 0 auto;
  background-color: rgb(${p => p.theme.colors.white});

  img {
    width: 55px;
    margin: 15px auto;
  }
`;
export const Bold = styled.span`
  font-weight: 600;
`;

export const HintTile = styled.div`
  max-width: 368px;
  display: flex;
  margin: 50px 0;
  padding: 16px 24px;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  border-radius: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 34px 18px 66px rgba(170, 172, 175, 0.15),
    7.75433px 25px 69px rgba(69, 71, 75, 0.15);

  img {
    width: 280px;
    margin: 50px auto;
  }
`;
