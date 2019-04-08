import withI18next from "lib/withI18next";
import { connect } from "react-redux";
import { Modal, H3, Paragraph, Button } from "components";
import { func, bool } from "prop-types";
import { acceptCookies as acceptCookiesAction } from "actions/app";
import isServer from "utils/isServer";
import { Flex } from "@rebass/grid";

const namespaces = ["cookies"];

const CookiesModal = ({ t, cookiesAccepted, acceptCookies }) =>
  !cookiesAccepted && !isServer ? (
    <Modal open onClose={acceptCookies}>
      <Flex width={450} flexDirection="column">
        <H3>{t("header")}</H3>
        <Paragraph>
          {`${t("paragraph")} `}
          <a
            href="https://foodetective.co/privacy-policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t("privacyPolicy")}
          </a>
          {` ${t("and")} `}
          <a
            href="https://foodetective.co/terms-conditions"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t("termsAndConditions")}
          </a>
        </Paragraph>
        <Button styleName="blue" onClick={acceptCookies}>
          {t("ok")}
        </Button>
      </Flex>
    </Modal>
  ) : null;

CookiesModal.propTypes = {
  t: func.isRequired,
  acceptCookies: func.isRequired,
  cookiesAccepted: bool.isRequired
};

export default withI18next(namespaces)(
  connect(
    state => ({
      cookiesAccepted: state.app.cookiesAccepted
    }),
    { acceptCookies: acceptCookiesAction }
  )(CookiesModal)
);
