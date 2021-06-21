import React from "react";
import { func, shape } from "prop-types";
import { Box, Flex } from "@rebass/grid";

import { Trans } from "i18n";
import { CircleWarningIcon } from "components/Icons";
import { Button } from "components";
import { ErrorIcon, RedText, StepHeading, TableWrapper } from "./styled";
import ImportErrorsTable from "./ImportErrorsTable";
import { ERROR } from "./utils";

const VerifyStepError = ({ t, error, onUploadAgainClick }) => {
  const shouldDisplayErrorsTable =
    error.type === ERROR.MISSING_DATA && error.data;

  const errorCount = error && error.data ? error.data.length : 0;
  return (
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
            count={errorCount}
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
            {t("lefood:import.upload_again")}
          </Button>
        </Box>
      </Flex>
    </>
  );
};

VerifyStepError.propTypes = {
  t: func.isRequired,
  onUploadAgainClick: func.isRequired,
  error: shape().isRequired
};

export default VerifyStepError;
