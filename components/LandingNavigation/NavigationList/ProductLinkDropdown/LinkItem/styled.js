import styled from "styled-components";
import { Box } from "@rebass/grid";

import { Body } from "components/styleguide/Typography";
import { NavItemIcon } from "components/NavBar/styled";
import { themeGet } from "utils/theme";
import { WORK_STATUS } from "../utils";

export const IconContainer = styled(NavItemIcon)`
  left: 13px;
`;

export const Container = styled(Box)`
  display: block;
  position: relative;
  padding: 12px 18px 12px 66px;
  color: rgb(${themeGet("colors.b2bSecondary")});
  border: 1px solid rgb(${themeGet("colors.gray.5")});
  border-radius: 8px;
  &:hover {
    color: rgb(${themeGet("colors.blue")});
    background-color: rgb(${themeGet("colors.blue")}, 0.1);
    border-color: transparent;
    ${IconContainer} {
      svg .primary {
        color: rgb(${themeGet("colors.white")});
      }
      svg .secondary {
        color: rgb(${themeGet("colors.white")});
      }
      &:before {
        background: rgb(${themeGet("colors.blue")});
      }
    }
  }
`;

export const Title = styled(Body)`
  font-weight: 600;
  color: inherit;
`;

export const Description = styled(Body)`
  color: inherit;
`;

export const Status = styled.div`
  position: absolute;
  right: 8px;
  top: 0;
  transform: translateY(-50%);
  padding: 6px 10px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  border: 1px solid;
  ${p => {
    switch (p.status) {
      case WORK_STATUS.COMING_SOON:
        return `
          color: rgb(${themeGet("colors.white")});
          background-color: rgb(${themeGet("colors.b2bSecondary")});
          border-color: transparent;
        `;
      default:
        return `
          color: rgb(${themeGet("colors.b2bSecondary")});
          background-color: rgb(${themeGet("colors.white")});
        `;
    }
  }}
`;
