import styled from "styled-components";

export const StyledExpandIcon = styled.span`
  color: rgb(${p => p.theme.colors.bombayDark});
  position: relative;
  width: 18px;
  height: 18px;
  overflow: hidden;
  ${p => (p.back ? "margin-right: 12px;" : "margin-left: 12px;")}
  font-size: 25px;
  line-height: 0;
  box-shadow: 0 0 4px 0 rgb(${p => p.theme.colors.boxShadow});
  border-radius: 50%;
  transform: rotate(${p => (p.back ? "180" : 0)}deg);

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
