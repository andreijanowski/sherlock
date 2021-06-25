import React from "react";
import { Flex, Box } from "@rebass/grid";
import { func } from "prop-types";
import { Form } from "react-final-form";

import { Button, File, RadioButtonField } from "components";
import {
  composeValidators,
  required,
  validateFileExtensions
} from "utils/validators";
import { UploadFileIcon } from "components/Icons";
import { DropzoneTipIcon } from "components/Dropzone/styled";
import {
  StepTitle,
  StepWrapper,
  InstructionsTitle,
  InstructionsList,
  InstructionsNote,
  DownloadButton
} from "./styled";
import { MODE } from "./utils";

const ACCEPTED_FILE_EXTENSIONS = [".csv"];

const initialValues = {
  mode: MODE.REPLACE
};

const EXAMPLE_FILE_URL = "/static/download/valid_menu.csv";

const UploadStep = ({ t, onUploadSubmit }) => (
  <Form onSubmit={onUploadSubmit} initialValues={initialValues}>
    {({ handleSubmit, form: { getState } }) => {
      const {
        values: { mode }
      } = getState();

      const fileUploadTip = (
        <Flex flexDirection="column" alignItems="center">
          <Box mb={2}>
            <DropzoneTipIcon>
              <UploadFileIcon />
            </DropzoneTipIcon>
          </Box>
          <span>{t("lefood:import.drag_input_title")}</span>
        </Flex>
      );

      return (
        <StepWrapper as="form" onSubmit={handleSubmit}>
          <StepTitle mb={4}>{t("lefood:import.upload_menu")}</StepTitle>
          <Flex
            width={1}
            justifyContent="flex-start"
            flexWrap="wrap"
            flexDirection={["column", "row"]}
          >
            <Box mr={4} mb={3}>
              <RadioButtonField name="mode" value={MODE.REPLACE} isCircle>
                {t("lefood:import.mode.replace")}
              </RadioButtonField>
            </Box>
            <Box mb={3}>
              <RadioButtonField name="mode" value={MODE.ADD} isCircle>
                {t("lefood:import.mode.add")}
              </RadioButtonField>
            </Box>
          </Flex>
          <Box mb={3}>
            <File
              restyled
              accept=""
              validate={composeValidators(
                required(t),
                validateFileExtensions(t, ACCEPTED_FILE_EXTENSIONS)
              )}
              name="file"
              tip={fileUploadTip}
              errorTipType={t("forms:validation.error.invalid_files")}
              errorInfoType=""
              info=""
            />
          </Box>
          <InstructionsTitle>
            {t("lefood:import.instructions")}
          </InstructionsTitle>
          <InstructionsList>
            {t(`lefood:import.instructions_${mode}`, {
              returnObjects: true
            }).map(instruction => (
              <li key={instruction}>{instruction}</li>
            ))}
          </InstructionsList>
          <InstructionsNote>
            {t(`lefood:import.instructions_note`)}
          </InstructionsNote>
          <Flex
            width={1}
            justifyContent="flex-start"
            flexWrap="wrap"
            flexDirection={["column", "row"]}
          >
            <Box mb={3} width="auto">
              <DownloadButton as="a" donwload href={EXAMPLE_FILE_URL}>
                {t("lefood:import.download_template")}
              </DownloadButton>
            </Box>
          </Flex>
          <Flex justifyContent="flex-end">
            <Box>
              <Button styleName="smallBlue" type="submit">
                {t("forms:next")}
              </Button>
            </Box>
          </Flex>
        </StepWrapper>
      );
    }}
  </Form>
);

UploadStep.propTypes = {
  t: func.isRequired,
  onUploadSubmit: func.isRequired
};

export default UploadStep;
