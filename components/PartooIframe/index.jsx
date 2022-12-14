import React, { useEffect, useState } from "react";
import { bool, func, string } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { Trans } from "i18n";
import { generatePartooToken as generatePartooTokenAction } from "actions/users";
import { selectIsPartooConnected } from "selectors/users";
import { useT, useLng } from "utils/hooks";
import CenteredSection from "components/CenteredSection";
import { ConnectedContainer, IFrameContainer, TopPane } from "./styled";
import GoToConnectionsButton from "./GoToConnectionsButton";
import { updateProfile } from "actions/users";

const BASE_CONTAINER_ID = "partoo-container";

const PartooIframe = ({
  startPage,
  generatePartooToken,
  isPartooConnected,
  updateProfileHandler
}) => {
  const [partooPage, setPartooPage] = useState(null);
  const t = useT();
  const lng = useLng();
  const router = useRouter();
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

  useEffect(() => {
    const path = window && window.location.pathname.substring(4);
    updateProfileHandler({ language: lng });
    router.push(`/${lng}/${path}`);
  }, [lng, updateProfileHandler, router]);

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
      <IFrameContainer id={containerId} lang={lng} />
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
  generatePartooToken: generatePartooTokenAction,
  updateProfileHandler: updateProfile
};

export default connect(mapState, mapDispatch)(PartooIframe);
