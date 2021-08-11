import styled, { css } from "styled-components";

export const Table = styled.table`
  min-width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-radius: ${p => p.theme.radius.double};
  overflow: hidden;
`;

export const TableCellCSS = css`
  padding: 24px 30px;
`;

export const TableHeadCell = styled.th`
  ${TableCellCSS};
  min-width: 150px;
  color: rgb(${p => p.theme.colors.gray["2"]});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 27px;
  &:first-child {
    text-align: left;
  }
  width: 25%;
`;

export const TableDataCell = styled.td`
  ${TableCellCSS};
  text-align: center;
  border-top: 1px solid rgb(${p => p.theme.colors.boxShadow});
`;

export const TableDataRow = styled.tr`
  cursor: pointer;
  ${p => p.isActive && `background: rgb(${p.theme.colors.blue}, 0.2);`}
  background: rgb(${p => p.theme.colors.white});
  &:hover {
    background: rgb(${p => p.theme.colors.blue}, 0.2);
  }
`;

export const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  background: rgb(${p => p.theme.colors.background});
`;

export const AvatarWrapper = styled.div`
  position: relative;
`;

export const Name = styled.div`
  white-space: nowrap;
  color: rgb(${p => p.theme.colors.black});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 18px;
`;

export const DetectiveLabel = styled.div`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 1;
  text-align: left;
  color: rgb(${p => p.theme.colors.blue});
`;

export const DetectiveIconWrapper = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
`;

export const LoadMoreButton = styled(TableDataCell).attrs({ colSpan: 4 })`
  .ExpandIcon {
    stroke-opacity: 1;
    stroke: rgb(${p => p.theme.colors.blue});
  }
`;
