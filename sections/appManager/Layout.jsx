import React, { useCallback } from "react";
import { func, string, node, shape, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

import AppLayout from "layout/App";
import {
  Button,
  ButtonWithImageText,
  LoadingIndicator,
  CurrencyGuard
} from "components";
import { checkIsBusinessStripeLoading } from "utils/businessUtils";

const AppManagerLayout = ({
  business,
  currentBusinessId,
  t,
  lng,
  page,
  children,
  addToUber,
  downloadFromUber,
  isUberAvailable
}) => {
  const onUploadToUberClick = useCallback(() => {
    addToUber(currentBusinessId);
  }, [addToUber, currentBusinessId]);

  const onDownloadFromUberClick = useCallback(
    () => downloadFromUber(currentBusinessId),
    [currentBusinessId, downloadFromUber]
  );

  const isBusinessLoading = checkIsBusinessStripeLoading(business);

  return (
    <AppLayout
      {...{
        mainIcon: "appManager",
        header: t(page),
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
          <Flex width={1} mt={3} flexWrap="wrap">
            {isUberAvailable && (
              <>
                <Box pr={3} mb={2}>
                  <Button onClick={onUploadToUberClick} styleName="withImage">
                    <ButtonWithImageText>
                      {t("import.upload_to_uber")}
                    </ButtonWithImageText>
                  </Button>
                </Box>
                <Box pr={3} mb={2}>
                  <Button
                    onClick={onDownloadFromUberClick}
                    styleName="withImage"
                  >
                    <ButtonWithImageText>
                      {t("import.download_from_uber")}
                    </ButtonWithImageText>
                  </Button>
                </Box>
              </>
            )}
          </Flex>
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
