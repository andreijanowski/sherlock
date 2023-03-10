import React, { useEffect, useMemo, useState } from "react";
import { bool, func } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Trans } from "i18n";
import { generatePartooToken as generatePartooTokenAction } from "actions/users";
import { selectIsPartooConnected } from "selectors/users";
import { useT, useLng } from "utils/hooks";
import CenteredSection from "components/CenteredSection";
import { ConnectedContainer, IFrameContainer, TopPane } from "./styled";
import GoToConnectionsButton from "./GoToConnectionsButton";
import GoToReviewBoosterButton from "./GoToReviewBoosterButton";
import { updateProfile } from "actions/users";

const BASE_CONTAINER_ID = "partoo-container";

const ReviewIframe = ({
  generatePartooToken,
  isPartooConnected,
  updateProfileHandler
}) => {
  const [partooPage, setPartooPage] = useState(null);
  const t = useT();
  const lng = useLng();
  const [startPage, setStartPage] = useState("reviewManagement");
  const containerId = useMemo(
    () => `${startPage || "reviewManagement"}-${BASE_CONTAINER_ID}`,
    [startPage]
  );
  const [managementConnected, setManagementConnected] = useState(false);
  const [boosterConnected, setBoosterConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPartooConnected) return () => {};

    let managementPage;

    const loadReviewManagementPage = async () => {
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

  useEffect(() => {
    updateProfileHandler({ language: lng });
    router.push(`/${lng}/app/reviews`);
  }, [lng, updateProfileHandler, router]);

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
      {containerId === `reviewManagement-${BASE_CONTAINER_ID}` && (
        <IFrameContainer id={containerId} />
      )}
      {containerId === `reviewBooster-${BASE_CONTAINER_ID}` && (
        <IFrameContainer id={containerId} />
      )}
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
  generatePartooToken: generatePartooTokenAction,
  updateProfileHandler: updateProfile
};

export default connect(mapState, mapDispatch)(ReviewIframe);
