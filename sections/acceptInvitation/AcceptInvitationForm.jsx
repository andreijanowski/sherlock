import { privacyPolicyLink, termsAndConditionsLink } from "consts";
import { Form as FinalForm } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { required } from "utils/validators";
import { Box } from "@rebass/grid";
import { Button, CheckboxField, BlueText, ItalicText, H3 } from "components";
import { func } from "prop-types";

const AcceptInvitationForm = ({ t, onSubmit }) => (
  <FinalForm
    onSubmit={onSubmit}
    render={({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        <H3>{t(`formMessage`)}</H3>
        <CheckboxField name="termsAgreement" validate={required(t)}>
          <Box>
            {t("terms.start")}
            <a
              href={privacyPolicyLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              <BlueText>
                <ItalicText>{t("terms.privacyPolicy")}</ItalicText>
              </BlueText>
            </a>
            {t("terms.and")}
            <a
              href={termsAndConditionsLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              <BlueText>
                <ItalicText>{t("terms.termsOfUse")}</ItalicText>
              </BlueText>
            </a>
          </Box>
        </CheckboxField>
        <Button
          onClick={handleSubmit}
          styleName="blue"
          fluid
          disabled={submitting}
        >
          {submitting ? (
            <FontAwesomeIcon icon="circle-notch" spin size="lg" />
          ) : (
            t("acceptationButton")
          )}
        </Button>
      </form>
    )}
  />
);

AcceptInvitationForm.propTypes = {
  t: func.isRequired,
  onSubmit: func.isRequired
};

export default AcceptInvitationForm;
