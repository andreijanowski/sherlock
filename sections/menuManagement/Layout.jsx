import React from "react";
import { bool, func, node, shape, string } from "prop-types";
import styled from "styled-components";

import AppLayout from "layout/App";
import { CurrencyGuard, LoadingIndicator } from "components";
import { checkIsBusinessStripeLoading } from "utils/businessUtils";

const AppLayoutWrapper = styled.div`
  height: 100vh;
  @media (max-width: ${p => p.theme.breakpoints[0]}) {
    height: auto;
  }
`;

const AppManagerLayout = ({ business, t, lng, page, children }) => {
  // see https://foodetective.atlassian.net/browse/FOOD-201?focusedCommentId=10163
  // const onUploadToUberClick = useCallback(() => {
  //   addToUber(currentBusinessId);
  // }, [addToUber, currentBusinessId]);
  //
  // const onDownloadFromUberClick = useCallback(
  //   () => downloadFromUber(currentBusinessId),
  //   [currentBusinessId, downloadFromUber]
  // );

  const isBusinessLoading = checkIsBusinessStripeLoading(business);

  return (
    <AppLayout
      {...{
        mainIcon: "menu-management",
        header: t(page),
        containerComponent: AppLayoutWrapper,
        t,
        lng
      }}
    >
      {isBusinessLoading ? (
        <>
          <LoadingIndicator />
        </>
      ) : (
        <CurrencyGuard>
          {/* see https://foodetective.atlassian.net/browse/FOOD-201?focusedCommentId=10163
            isUberAvailable && (
            <Flex width={1} mt={3} flexWrap="wrap">
              <Box pr={3} mb={2}>
                <StyledButton onClick={onUploadToUberClick} styleName="withImage">
                  <ButtonWithImageText>
                    {t("import.upload_to_uber")}
                  </ButtonWithImageText>
                </StyledButton>
              </Box>
              <Box pr={3} mb={2}>
                <StyledButton onClick={onDownloadFromUberClick} styleName="withImage">
                  <ButtonWithImageText>
                    {t("import.download_from_uber")}
                  </ButtonWithImageText>
                </StyledButton>
              </Box>
            </Flex>
          )

          */}
          {children}
        </CurrencyGuard>
      )}
    </AppLayout>
  );
};

AppManagerLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  page: string.isRequired,
  children: node.isRequired,
  business: shape(),
  currentBusinessId: string,
  addToUber: func,
  downloadFromUber: func,
  isUberAvailable: bool
};

AppManagerLayout.defaultProps = {
  addToUber: () => {},
  downloadFromUber: () => {},
  currentBusinessId: "",
  business: null,
  isUberAvailable: false
};

export default AppManagerLayout;
