import styled from "styled-components";

export const Wrapper = styled.div`
  background: white;
  border-right: 1px solid rgb(${p => p.theme.colors.greyBorder});
  padding: 0 10px;
  width: 325px;
  min-height: 100vh;
`;

export const SelectWrapper = styled.div`
  margin: 35px 0;
`;

export const NavList = styled.ul`
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  list-style: none;
  &:not(:last-child) {
    border-bottom: 1px solid rgb(${p => p.theme.colors.greyBorder});
  }
`;

export const NavItemIcon = styled.span`
  display: inline-flex;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 55px;
  justify-content: center;
  svg .primary {
    color: rgb(${p => p.theme.colors.bombay});
  }
  svg .secondary {
    color: rgb(${p => p.theme.colors.bombayDark});
  }
`;

export const NavItemLink = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 12px 25px 12px 60px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 21px;
  letter-spacing: 0.3px;
  &:hover {
    background-color: rgb(${p => p.theme.colors.background});
  }
  color: rgb(${p => p.theme.colors.darkText});
  ${p =>
    p.isActive &&
    `
  color: rgb(${p.theme.colors.blue});
  ${NavItemIcon} {
      svg .primary {
        color: rgb(${p.theme.colors.blue});
      }
      svg .secondary {
        color: rgb(${p.theme.colors.menuDarkBlue});
      }
    }
  `}
`;

export const BadgeNumber = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 20px;
  height: 20px;
  color: rgb(${p => p.theme.colors.white});
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  background: rgb(${p => p.theme.colors.blue});
  border-radius: 50%;
`;
