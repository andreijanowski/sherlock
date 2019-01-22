import withI18next from "lib/withI18next";
import { func, bool } from "prop-types";
import { WordmarkWrapper, Tagline } from "./styled";

const namespaces = ["common"];

const Wordmark = ({ t, inline }) => (
  <WordmarkWrapper>
    Sherlock
    <Tagline {...{ inline }}>{t("foodetectiveCompany")}</Tagline>
  </WordmarkWrapper>
);

Wordmark.propTypes = {
  t: func.isRequired,
  inline: bool
};

Wordmark.defaultProps = {
  inline: false
};

export default withI18next(namespaces)(Wordmark);
