import styled from "styled-components";
import { Paragraph } from "components";

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  /* background: url("/static/img/testimonials/avatar.jpg"); */
  background: ${({ i }) =>
    `url("/static/img/testimonials/avatar${i + 1}.png")`};
  background-position: center;
  background-size: contain;
  border-radius: 50%;
`;

export const ParagraphStyled = styled(Paragraph)`
  padding: 16px;
  background: white;
  border: 1px solid rgb(${p => p.theme.colors.lavenderGray});
  border-radius: 8px;

  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    font-size: ${p => p.theme.fontSizes.f18};
  }
`;

export const Name = styled.p`
  font-size: ${p => p.theme.fontSizes.f16};

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f21};
  }

  > span {
    font-weight: bold;
  }
`;
