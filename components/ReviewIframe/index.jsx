import React, { useEffect, useMemo, useState } from "react";
import { bool, func } from "prop-types";
import { connect } from "react-redux";
import { Trans } from "i18n";
import { generatePartooToken as generatePartooTokenAction } from "actions/users";
import { selectIsPartooConnected } from "selectors/users";
import { useT } from "utils/hooks";
import CenteredSection from "components/CenteredSection";
import { ConnectedContainer, IFrameContainer, TopPane } from "./styled";
import GoToConnectionsButton from "./GoToConnectionsButton";
import GoToReviewBoosterButton from "./GoToReviewBoosterButton";

const BASE_CONTAINER_ID = "partoo-container";

const ReviewIframe = ({ generatePartooToken, isPartooConnected }) => {
  const [partooPage, setPartooPage] = useState(null);
  const t = useT();
  const [startPage, setStartPage] = useState("reviewManagement");
  const containerId = useMemo(
    () => `${startPage || "reviewManagement"}-${BASE_CONTAINER_ID}`,
    [startPage]
  );
  const [managementConnected, setManagementConnected] = useState(false);
  const [boosterConnected, setBoosterConnected] = useState(false);

  useEffect(() => {
    if (!isPartooConnected) return () => {};

    let managementPage;

    const loadReviewManagementPage = async () => {
      try {
        const {
          rawData: { token }
        } = await generatePartooToken();

        const options =
          startPage === "reviewManagement"
            ? {
                startPage,
                displayIntercom: false,
                displayUserParams: false,
                displayAddButton: false
              }
            : { startPage };

        managementPage = window.Partoo.init(containerId, options);
        managementPage.login(token);
        setPartooPage(managementPage);
      } catch (e) {
        console.error(e);
      }
    };

    loadReviewManagementPage();

    return () => {
      if (managementPage) {
        managementPage.destroy();
      }
    };
  }, [containerId, startPage, generatePartooToken, isPartooConnected]);

  return isPartooConnected ? (
    <ConnectedContainer>
      <TopPane>
        {partooPage && !boosterConnected && (
          <GoToConnectionsButton
            partooPage={partooPage}
            setStartPage={setStartPage}
            startPage={startPage}
            connected={managementConnected}
            setConnected={setManagementConnected}
          />
        )}
        {partooPage && !managementConnected && (
          <GoToReviewBoosterButton
            partooPage={partooPage}
            setStartPage={setStartPage}
            startPage={startPage}
            connected={boosterConnected}
            setConnected={setBoosterConnected}
          />
        )}
      </TopPane>
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

ReviewIframe.propTypes = {
  generatePartooToken: func.isRequired,
  isPartooConnected: bool
};

ReviewIframe.defaultProps = {
  isPartooConnected: false
};

const mapState = state => ({
  isPartooConnected: selectIsPartooConnected(state)
});

const mapDispatch = {
  generatePartooToken: generatePartooTokenAction
};

export default connect(mapState, mapDispatch)(ReviewIframe);
