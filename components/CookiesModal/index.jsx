import { useState } from "react";
import { withTranslation } from "i18n";
import { Modal, H3, Paragraph, Button } from "components";
import { func } from "prop-types";
import isServer from "utils/isServer";
import { privacyPolicyLink, termsAndConditionsLink } from "consts";
import { Wrapper } from "./styled";

const namespaces = ["cookies"];

const CookiesModal = ({ t }) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!isServer && window.localStorage.getItem("cookiesAccepted") !== "true") {
    const acceptCookies = () =>
      window.localStorage.setItem("cookiesAccepted", "true");
    return (
      <Modal
        open={isOpen}
        onClose={() => {
          acceptCookies();
          setIsOpen(false);
        }}
      >
        <Wrapper>
          <H3>{t("header")}</H3>
          <Paragraph>
            {`${t("paragraph")} `}
            <a
              href={privacyPolicyLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t("privacyPolicy")}
            </a>
            {` ${t("and")} `}
            <a
              href={termsAndConditionsLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t("termsAndConditions")}
            </a>
          </Paragraph>
          <Button
            styleName="blue"
            onClick={() => {
              acceptCookies();
              setIsOpen(false);
            }}
          >
            {t("ok")}
          </Button>
        </Wrapper>
      </Modal>
    );
  }
  return null;
};

CookiesModal.propTypes = {
  t: func.isRequired
};

export default withTranslation(namespaces)(CookiesModal);
