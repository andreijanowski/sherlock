import { Flex, Box } from "@rebass/grid";
import styled, { createGlobalStyle, css } from "styled-components";

import { H2, H4, StyledButton } from "components";

const TRANSITION_TIME = "0.3s";

export const ModalStyles = createGlobalStyle`
  .modal-modal {
    width: 100%;
    max-width: 1255px;
    padding: 25px 40px 40px;
    border-radius: ${p => p.theme.radius.semi};
    background-color: rgb(${p => p.theme.colors.lightBlue});
  }

  .modal-closeButton {
    align-items: center;
    justify-content: center;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }

  .modal-closeIcon {
    stroke-width: 1px;
    width: 60%;
    height: 60%;
  }
`;

export const FormStepperWrapper = styled(Flex)`
  max-width: 525px;
  margin: 0 auto 55px;
`;

export const FormStepperItem = styled(Flex)`
  position: relative;
`;

export const FormStepperCircle = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color ${TRANSITION_TIME};
  background-color: rgba(
    ${p => (p.isActive ? p.theme.colors.blue : p.theme.colors.importGray)},
    0.3
  );
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: background-color ${TRANSITION_TIME};
    background-color: rgb(
      ${p => (p.isActive ? p.theme.colors.blue : p.theme.colors.importGray)}
    );
  }
`;

export const FormStepperLabel = styled.div`
  position: absolute;
  bottom: -25px;
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 24px;
  color: rgb(
    ${p => (p.isActive ? p.theme.colors.blue : p.theme.colors.importGray)}
  );
`;

export const FormStepperLine = styled.div`
  flex: auto;
  height: 1.75px;
  transition: background-color ${TRANSITION_TIME};
  background-color: rgb(
    ${p => (p.isActive ? p.theme.colors.blue : p.theme.colors.importGray)}
  );
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(${p => p.theme.colors.white});
  padding: 25px 40px;
  border-radius: ${p => p.theme.radius.semi};
  min-height: 500px;
  ${p =>
    p.isCentered
      ? `
    justify-content: center;
    align-items: center;
  `
      : `
    justify-content: space-between;
  `}
`;

export const StepTitle = styled(H2)`
  font-size: ${p => p.theme.fontSizes.f24};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 54px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f36};
  }
`;

export const InstructionsTitle = styled(H4)`
  margin-bottom: 8px;
  font-size: ${p => p.theme.fontSizes.f18};
  font-weight: ${p => p.theme.fontWeights.medium};
`;

export const InstructionsList = styled.ol`
  margin: 0 0 24px;
  padding-left: 20px;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 24px;
`;

export const InstructionsNote = styled.p`
  margin: 0 auto 24px;
  font-style: italic;
`;

export const DownloadButton = styled(StyledButton).attrs({
  styleName: "blue"
})`
  min-width: 245px;
  border-radius: 22px;

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding: 8px 25px;
  }
`;

export const LoadingIndicatorWrapper = styled.div`
  position: relative;
  margin: 0 auto 27px;
`;

export const StepHeading = styled.div`
  font-size: ${p => p.theme.fontSizes.f24};
  font-weight: ${p => p.theme.fontWeights.medium};
  line-height: 36px;
  text-align: center;
`;

export const VerifyHeading = styled(StepHeading)`
  text-align: center;
  color: rgb(${p => p.theme.colors.importGray});
`;

export const PublishHeading = styled(StepHeading)`
  max-width: 283px;
`;

export const ErrorIcon = styled(Box)`
  text-align: center;
  font-size: ${p => p.theme.fontSizes.f44};
  color: rgb(${p => p.theme.colors.error});
`;

export const RedText = styled.span`
  color: rgb(${p => p.theme.colors.error});
`;

export const TableWrapper = styled.div`
  flex: auto;
  width: 100%;
  max-height: 360px;
  overflow: auto;
  margin: 35px auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 500px;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid rgb(${p => p.theme.colors.blue});
`;

const BaseCellCSS = css`
  padding: 5px 10px;
  text-align: center;
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 27px;
  ${p => (p.isError ? `text-align: left;` : `width: 15%;`)}
`;

export const HeaderCell = styled.th`
  ${BaseCellCSS}
  color: #fff;
  background-color: rgb(${p => p.theme.colors.blue});
  font-weight: ${p => p.theme.fontWeights.medium};
  &:not(:last-child) {
    border-right: 1px solid rgb(${p => p.theme.colors.blue});
  }
`;

export const DataCell = styled.td`
  ${BaseCellCSS};
  background-color: rgb(${p => p.theme.colors.lightBlue});
  font-weight: ${p =>
    p.isError ? p.theme.fontWeights.regular : p.theme.fontWeights.medium};
  &:first-child {
    border-left: 1px solid rgb(${p => p.theme.colors.blue});
  }
  &:not(:last-child) {
    border-right: 1px solid #fff;
  }
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #fff;
  }
`;
