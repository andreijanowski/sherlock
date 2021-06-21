import React, { useState, useCallback } from "react";
import { string, func } from "prop-types";
import { withTranslation } from "i18n";
import { compose } from "redux";
import { connect } from "react-redux";

import { uploadDishes as uploadDishesAction } from "actions/dishes";
import { Modal } from "components";
import fileToBase64 from "utils/fileToBase64";
import FormStepper from "./FormStepper";
import { ModalStyles } from "./styled";
import { ERROR, ORDERED_STEPS, STEPS } from "./utils";
import UploadStep from "./UploadStep";
import VerifyStep from "./VerifyStep";
import PublishStep from "./PublishStep";

const namespaces = ["lefood", "forms"];

const UNPROCESSABLE_STATUS_CODE = 422;

const ImportModal = ({ t, onClose, businessId, uploadDishes }) => {
  const [step, setStep] = useState(STEPS.UPLOAD);
  const [error, setError] = useState(null);

  const onUploadSubmit = useCallback(
    async ({ file: rawFile, ...values }) => {
      setStep(STEPS.VERIFY);
      try {
        const file = await fileToBase64(rawFile);
        await uploadDishes(
          {
            ...values,
            file
          },
          businessId
        );
        setStep(STEPS.PUBLISH);
      } catch (e) {
        const errorResponse = e.response;
        const errorData =
          errorResponse && errorResponse.data && errorResponse.data.errors;
        const errorCode = errorResponse && errorResponse.status;

        if (
          errorCode === UNPROCESSABLE_STATUS_CODE &&
          errorData &&
          errorData.length
        ) {
          setError({ type: ERROR.MISSING_DATA, data: errorData });
        } else {
          setError({ type: ERROR.OTHER });
        }
      }
    },
    [businessId, uploadDishes]
  );

  const onUploadAgainClick = useCallback(() => {
    setStep(STEPS.UPLOAD);
    setError(null);
  }, []);

  return (
    <>
      <ModalStyles />
      <Modal open onClose={onClose}>
        <FormStepper t={t} step={step} steps={ORDERED_STEPS} />
        {step === STEPS.UPLOAD && (
          <UploadStep t={t} onUploadSubmit={onUploadSubmit} />
        )}
        {step === STEPS.VERIFY && (
          <VerifyStep
            t={t}
            error={error}
            onUploadAgainClick={onUploadAgainClick}
          />
        )}
        {step === STEPS.PUBLISH && <PublishStep t={t} />}
      </Modal>
    </>
  );
};

ImportModal.propTypes = {
  businessId: string,
  t: func.isRequired,
  onClose: func.isRequired,
  uploadDishes: func.isRequired
};

ImportModal.defaultProps = {
  businessId: null
};

const mapState = state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business =
    businessData &&
    businessData.get("businesses") &&
    businessData.get("businesses").first();

  return {
    businessId: business && business.get("id")
  };
};

const mapDispatch = {
  uploadDishes: uploadDishesAction
};

export default compose(
  withTranslation(namespaces),
  connect(
    mapState,
    mapDispatch
  )
)(ImportModal);
