import { useState } from "react";
import { withNamespaces } from "i18n";
import { Modal, H3, Paragraph, Button } from "components";
import { func } from "prop-types";
import isServer from "utils/isServer";
import { Flex } from "@rebass/grid";
import { privacyPolicyLink, termsAndConditionsLink } from "consts";

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
        <Flex width={450} flexDirection="column">
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
        </Flex>
      </Modal>
    );
  }
  return null;
};

CookiesModal.propTypes = {
  t: func.isRequired
};

export default withNamespaces(namespaces)(CookiesModal);
