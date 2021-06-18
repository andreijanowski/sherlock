import React from "react";
import { Box, Flex } from "@rebass/grid";
import { func, shape } from "prop-types";

import { Trans } from "i18n";
import { Button, LoadingIndicator } from "components";
import { CircleWarningIcon } from "components/Icons";
import {
  StepWrapper,
  LoadingIndicatorWrapper,
  StepHeading,
  VerifyHeading,
  ErrorIcon,
  RedText,
  TableWrapper
} from "./styled";
import { ERROR } from "./utils";
import ImportErrorsTable from "./ImportErrorsTable";

const VerifyStep = ({ t, error, onUploadAgainClick }) => {
  const shouldDisplayErrorsTable =
    error && error.type === ERROR.MISSING_DATA && error.data;

  return (
    <StepWrapper isCentered={!error}>
      {error ? (
        <>
          <Box>
            {!shouldDisplayErrorsTable && (
              <ErrorIcon mt={120} mb={3}>
                <CircleWarningIcon />
              </ErrorIcon>
            )}
            <StepHeading>
              <Trans
                t={t}
                i18nKey={`lefood:import.error.${error.type}`}
                count={error.data ? error.data.length : 0}
                components={[<RedText />, <br />]}
              />
            </StepHeading>
          </Box>
          {shouldDisplayErrorsTable && (
            <TableWrapper>
              <ImportErrorsTable t={t} data={error.data} />
            </TableWrapper>
          )}
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                styleName="smallBlue"
                type="button"
                onClick={onUploadAgainClick}
              >
                {t("lefood:import.uploadAgain")}
              </Button>
            </Box>
          </Flex>
        </>
      ) : (
        <Box width={1}>
          <LoadingIndicatorWrapper>
            <LoadingIndicator size={40} />
          </LoadingIndicatorWrapper>
          <VerifyHeading>{t("lefood:import.verifying")}</VerifyHeading>
        </Box>
      )}
    </StepWrapper>
  );
};

VerifyStep.propTypes = {
  t: func.isRequired,
  onUploadAgainClick: func.isRequired,
  error: shape()
};

VerifyStep.defaultProps = {
  error: null
};

export default VerifyStep;
