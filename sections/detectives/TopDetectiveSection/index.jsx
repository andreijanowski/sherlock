import { compose } from "redux";
import { withTranslation } from "i18n";
import { connect } from "react-redux";
import { withTheme } from "styled-components";

import TopDetective from "components/Detectives/TopDetective";

const namespaces = ["detectives"];

export default compose(
  withTranslation(namespaces),
  withTheme,
  connect(state => {
    const detective = state.getIn(["detectives", "data", "topDetective"]);
    return {
      detective
    };
  })
)(TopDetective);
