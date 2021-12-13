import React, { useEffect } from "react";
import { bool, func, string } from "prop-types";
import { connect } from "react-redux";

import { Trans } from "i18n";
import { generatePartooToken as generatePartooTokenAction } from "actions/users";
import { selectIsPartooConnected } from "selectors/users";
import { useT } from "utils/hooks";
import { IFrameContainer, NotConnectedContainer } from "./styled";

const BASE_CONTAINER_ID = "partoo-container";

const PartooIframe = ({
  startPage,
  generatePartooToken,
  isPartooConnected
}) => {
  const t = useT();
  const containerId = `${startPage}-${BASE_CONTAINER_ID}`;

  useEffect(() => {
    if (!isPartooConnected) return () => {};

    let partooPage;

    const loadPartooPage = async () => {
      try {
        const {
          rawData: { token }
        } = await generatePartooToken();

        const options = {
          startPage,
          displayIntercom: false,
          displayUserParams: false,
          displayAddButton: false
        };

        partooPage = window.Partoo.init(containerId, options);
        partooPage.login(token);
      } catch (e) {
        console.error(e);
      }
    };

    loadPartooPage();
    return () => {
      if (partooPage) {
        partooPage.destroy();
      }
    };
  }, [containerId, generatePartooToken, isPartooConnected, startPage]);

  return isPartooConnected ? (
    <IFrameContainer id={containerId} />
  ) : (
    <NotConnectedContainer>
      <Trans
        t={t}
        i18nKey="app:connectPartoo"
        components={[
          <ol>
            <li />
            <li />
            <li />
          </ol>
        ]}
      />
    </NotConnectedContainer>
  );
};

PartooIframe.propTypes = {
  startPage: string.isRequired,
  generatePartooToken: func.isRequired,
  isPartooConnected: bool
};

PartooIframe.defaultProps = {
  isPartooConnected: false
};

const mapState = state => ({
  isPartooConnected: selectIsPartooConnected(state)
});

const mapDispatch = {
  generatePartooToken: generatePartooTokenAction
};

export default connect(
  mapState,
  mapDispatch
)(PartooIframe);
