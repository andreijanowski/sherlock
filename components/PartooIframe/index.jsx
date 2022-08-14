import React, { useEffect, useState } from "react";
import { bool, func, string } from "prop-types";
import { connect } from "react-redux";

import { Trans } from "i18n";
import { generatePartooToken as generatePartooTokenAction } from "actions/users";
import { selectIsPartooConnected } from "selectors/users";
import { useT } from "utils/hooks";
import CenteredSection from "components/CenteredSection";
import { ConnectedContainer, IFrameContainer, TopPane } from "./styled";
import GoToConnectionsButton from "./GoToConnectionsButton";

const BASE_CONTAINER_ID = "partoo-container";

const PartooIframe = ({
  startPage,
  generatePartooToken,
  isPartooConnected
}) => {
  const [partooPage, setPartooPage] = useState(null);
  const t = useT();
  const containerId = `${startPage}-${BASE_CONTAINER_ID}`;

  useEffect(() => {
    if (!isPartooConnected) return () => {};

    let page;

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

        page = window.Partoo.init(containerId, options);
        page.login(token);
        setPartooPage(page);
      } catch (e) {
        console.error(e);
      }
    };

    loadPartooPage();
    return () => {
      if (page) {
        page.destroy();
      }
    };
  }, [containerId, generatePartooToken, isPartooConnected, startPage]);

  return isPartooConnected ? (
    <ConnectedContainer>
      {partooPage && (
        <TopPane>
          <GoToConnectionsButton
            partooPage={partooPage}
            startPage={startPage}
          />
        </TopPane>
      )}
      <IFrameContainer id={containerId} />
    </ConnectedContainer>
  ) : (
    <CenteredSection>
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
    </CenteredSection>
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

export default connect(mapState, mapDispatch)(PartooIframe);
