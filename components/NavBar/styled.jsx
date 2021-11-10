import styled from "styled-components";

const SIDEBAR_WIDTH = 300;

export const Wrapper = styled.div`
  background: white;
  border-right: 1px solid rgb(${p => p.theme.colors.greyBorder});
  padding: 0 10px;
  width: ${SIDEBAR_WIDTH}px;
  min-height: 100vh;
  overflow-x: hidden;
`;

export const SelectWrapper = styled.div`
  margin: 35px 0;
`;

export const TransitionContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0 -10px;
`;

export const NavTransitionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
  transition: max-width 0.3s;
  flex: none;

  &.rightSlide-enter {
    max-width: 0;
    white-space: nowrap;
  }

  &.rightSlide-enter-active {
    max-width: 100%;
  }

  &.rightSlide-exit {
    max-width: 100%;
    white-space: nowrap;
  }

  &.rightSlide-exit-active {
    max-width: 0;
  }
`;

export const NavList = styled.ul`
  width: ${SIDEBAR_WIDTH}px;
  padding: 0 10px;
  margin: 0;
`;

export const ChildrenWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  flex: none;
`;

export const NavItem = styled.li`
  list-style: none;
  ${p =>
    !p.withoutIcon &&
    `
    &:not(:first-child) {
      border-top: 1px solid rgb(${p.theme.colors.greyBorder});
    }
  `}
`;

export const NavItemIcon = styled.span`
  display: inline-flex;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 0;
  transform: translateY(-50%);
  font-size: 55px;
  justify-content: center;
  svg .primary {
    color: rgb(${p => p.theme.colors.bombay});
  }
  svg .secondary {
    color: rgb(${p => p.theme.colors.bombayDark});
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background-color: rgb(${p => p.theme.colors.detectivesBackgroundGrey});
    border-radius: 50%;
    z-index: -1;
  }
`;

export const NavItemLink = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: ${p => (p.withoutIcon ? "12px" : "20px 25px 20px 60px")};
  font-weight: ${p =>
    p.withoutIcon ? p.theme.fontWeights.medium : p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f13};
  line-height: 21px;
  letter-spacing: 0.3px;
  &:hover {
    background-color: rgb(${p => p.theme.colors.background});
  }
  color: rgb(
    ${p => (p.withoutIcon ? p.theme.colors.gray["3"] : p.theme.colors.darkText)}
  );
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
