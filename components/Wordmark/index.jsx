import { withTranslation } from "i18n";
import { func, bool } from "prop-types";
import { WordmarkWrapper, Tagline } from "./styled";

const namespaces = ["common"];

const Wordmark = ({ t, inline }) => (
  <WordmarkWrapper>
    Foodetective <Tagline {...{ inline }}>{t("forBusiness")}</Tagline>
  </WordmarkWrapper>
);

Wordmark.propTypes = {
  t: func.isRequired,
  inline: bool
};

Wordmark.defaultProps = {
  inline: false
};

export default withTranslation(namespaces)(Wordmark);
