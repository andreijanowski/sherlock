import styled from "styled-components";
import { H2, H3 } from "components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Header = styled(H2)`
  font-size: 36px;
  text-align: center;
`;

export const Blue = styled.span`
  color: rgb(${p => p.theme.colors.blue});
`;

export const Image = styled.img`
  margin: 32px auto 46px;
`;

export const TilesWrapper = styled.div`
  display: flex;
  justify-content: center;
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

export const StyledH3 = styled(H3)`
  font-weight: 600;
  font-size: 24px !important;
  color: rgb(${p => p.theme.colors.white});
`;
