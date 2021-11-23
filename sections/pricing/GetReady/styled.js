import styled from "styled-components";

import { Button as BaseButton } from "components";
import {
  WRAPPER_WIDTH,
  ParagraphStyled as BaseParagraphStyled
} from "sections/common/sharedStyled";

export const Container = styled.div`
  max-width: ${WRAPPER_WIDTH}px;
  padding: 210px 16px;
  margin: auto;
`;

export const H2Styled = styled.h2`
  margin: 0;
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f48};
  line-height: 72px;
  letter-spacing: 0.6px;
`;

export const ParagraphStyled = styled(BaseParagraphStyled).attrs({ big: true })`
  margin-bottom: 0;
  max-width: 470px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: ${p => p.theme.fontSizes.f36};
`;

export const BookDemoButton = styled(BaseButton).attrs({
  styleName: "becomePartner"
})`
  margin-right: 13px;
  background: rgb(${p => p.theme.colors.blue});
  &:hover {
    box-shadow: none;
    background: rgba(${p => p.theme.colors.blue}, 0.8);
  }
`;

export const SeeSubscriptionsButton = styled(BookDemoButton)`
  margin: 0;
  background: rgb(${p => p.theme.colors.gray["5"]});
  &:hover {
    background: rgba(${p => p.theme.colors.gray["5"]}, 0.8);
  }
`;

// todo check with design team how it should be in mobile view
export const ImageContainer = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const Image = styled.img``;

export const ImageOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 100px;
`;
