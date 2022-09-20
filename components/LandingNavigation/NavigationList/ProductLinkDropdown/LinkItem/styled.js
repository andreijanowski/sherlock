import styled from "styled-components";
import { Box } from "@rebass/grid";

import { Body } from "components/styleguide/Typography";
import { NavItemIcon } from "components/NavBar/styled";
import { themeGet } from "utils/theme";
import { WORK_STATUS } from "../utils";

export const IconContainer = styled(NavItemIcon)`
  left: 0;
`;

export const Container = styled(Box)`
  display: block;
  position: relative;
  padding: 2px 5px 2px 50px;
  color: rgb(${themeGet("colors.b2bSecondary")});
  border-radius: 8px;
  &:hover {
    color: rgb(${themeGet("colors.b2bSecondary")});
    border-color: transparent;
    ${IconContainer} {
      svg .primary {
        color: rgb(${themeGet("colors.white")});
      }
      svg .secondary {
        color: rgb(${themeGet("colors.white")});
      }
      &:before {
        background: rgb(${themeGet("colors.b2bSecondary")});
      }
    }

    p {
      color: rgb(${themeGet("colors.b2bSecondary")});

      :not(:last-child) {
        :after {
          margin-left: 8px;
          content: "➔";
        }
      }
    }
  }
`;

export const Title = styled(Body)`
  font-weight: 600;
  font-size: 14px;
  color: inherit;
`;

export const Description = styled(Body)`
  font-size: 14px;
  color: rgb(${themeGet("colors.rollingStone")});
`;

export const Status = styled.div`
  position: absolute;
  right: 8px;
  top: -5px;
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
