import { useState, useCallback, useEffect } from "react";
import { withTranslation } from "i18n";
import { Modal, H3, Paragraph, StyledButton } from "components";
import { func } from "prop-types";
import isServer from "utils/isServer";
import { privacyPolicyLink, termsAndConditionsLink } from "consts";
import { Wrapper } from "./styled";

const namespaces = ["cookies"];

const ACCEPTED_COOKIES_KEY = "cookiesAccepted";

const CookiesModal = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const acceptCookies = useCallback(
    () => window.localStorage.setItem(ACCEPTED_COOKIES_KEY, "true"),
    []
  );

  const onCookiesAccept = useCallback(() => {
    acceptCookies();
    setIsOpen(false);
  }, [acceptCookies]);

  useEffect(() => {
    const areCookiesAccepted =
      window.localStorage.getItem(ACCEPTED_COOKIES_KEY) === "true";
    setIsOpen(!areCookiesAccepted);
  }, []);

  if (isServer) return null;

  return (
    <Modal open={isOpen} onClose={onCookiesAccept}>
      <Wrapper>
        <H3>{t("header")}</H3>
        <Paragraph>
          {`${t("paragraph")} `}
          <a href={privacyPolicyLink} target="_blank" rel="noreferrer noopener">
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
        <StyledButton styleName="blue" onClick={onCookiesAccept}>
          {t("ok")}
        </StyledButton>
      </Wrapper>
    </Modal>
  );
};

CookiesModal.propTypes = {
  t: func.isRequired
};

export default withTranslation(namespaces)(CookiesModal);
