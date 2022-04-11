import React, { useCallback, useState } from "react";
import { withTranslation } from "i18n";
import { bool, func, shape, string } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { Confirm } from "components/modals";
import requireAuth from "lib/requireAuth";
import AppManagerLayout from "sections/menuManagement/Layout";
import Menu from "sections/menuManagement/menu";
import { deleteDish, patchDish, postDish } from "actions/dishes";
import { deletePicture, postPicture } from "actions/pictures";
import {
  downloadMenuFromUberEats,
  uploadMenuToUberEats
} from "actions/integrations";
import { convertToCents } from "utils/price";
import { ImportModal } from "components";
import { selectDenormalizedDishes } from "selectors/dishes";

const ACTION_TYPE = {
  DOWNLOAD_UBER_EATS: "DOWNLOAD_UBER_EATS",
  UPLOAD_UBER_EATS: "UPLOAD_UBER_EATS"
};

const namespaces = ["lefood", "app", "forms"];

const MenuPage = ({
  addDish,
  updateDish,
  businessId,
  downloadMenu,
  uploadMenu,
  removeDish,
  addPicture,
  removePicture,
  t,
  lng,
  dishes,
  loading,
  business,
  businesses,
  categories,
  isUberAvailable,
  hasPosIntegration
}) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [editedDishId, setEditedDishId] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  const onAddDish = useCallback(
    values => {
      const {
        available,
        name,
        description,
        category,
        onUberEats,
        skuRef,
        dishOptionCategories
      } = values;
      const dish = {
        name,
        description,
        onUberEats,
        unavailable: !available,
        skuRef,
        pricePerItemCents: convertToCents(values.pricePerItemCents)
      };

      const preparedDishOptionsCategories =
        dishOptionCategories &&
        dishOptionCategories.map(optionsCategory => ({
          ...optionsCategory,
          dishOptions:
            optionsCategory.dishOptions &&
            optionsCategory.dishOptions.map(option => ({
              ...option,
              pricePerItemCents: convertToCents(option.pricePerItemCents)
            }))
        }));

      if (editedDishId) {
        return updateDish(
          dish,
          editedDishId,
          category,
          preparedDishOptionsCategories
        );
      }
      return addDish(dish, businessId, category, preparedDishOptionsCategories);
    },
    [addDish, businessId, editedDishId, updateDish]
  );

  const hideModal = useCallback(() => {
    setConfirmModalData(null);
  }, []);

  const onConfirm = useCallback(() => {
    const { action, menuId } = confirmModalData;
    if (action === ACTION_TYPE.DOWNLOAD_UBER_EATS) {
      downloadMenu(menuId);
    } else {
      uploadMenu(menuId);
    }

    hideModal();
  }, [confirmModalData, downloadMenu, hideModal, uploadMenu]);

  const onUploadMenuClick = useCallback(
    menuId => {
      setConfirmModalData({
        action: ACTION_TYPE.UPLOAD_UBER_EATS,
        menuId,
        title: t("lefood:import.upload_to_uber_confirm")
      });
    },
    [t]
  );

  const onDownloadMenuClick = useCallback(
    menuId => {
      setConfirmModalData({
        action: ACTION_TYPE.DOWNLOAD_UBER_EATS,
        menuId,
        title: t("lefood:import.download_from_uber_confirm")
      });
    },
    [t]
  );

  const onRemoveDish = useCallback(
    id => {
      if (id === editedDishId) {
        setEditedDishId(null);
      }
      removeDish(id);
    },
    [editedDishId, removeDish]
  );

  const onAddPicture = useCallback(
    (picture, id) => addPicture("dish", id, picture),
    [addPicture]
  );

  const onRemovePicture = useCallback(
    id => {
      removePicture(id, "dish", editedDishId);
    },
    [editedDishId, removePicture]
  );

  const onShowImportModalClick = useCallback(() => {
    setShowImportModal(true);
  }, []);

  const onHideImportModal = useCallback(() => {
    setShowImportModal(false);
  }, []);

  return (
    <AppManagerLayout
      {...{
        t,
        lng,
        page: "app:menuManagement",
        currentBusinessId: businessId,
        business,
        businesses,
        addToUber: onUploadMenuClick,
        downloadFromUber: onDownloadMenuClick,
        isUberAvailable
      }}
    >
      <Menu
        {...{
          t,
          dishes,
          categories,
          loading,
          editedDishId,
          addDish: onAddDish,
          businessId,
          setEditedDishId,
          removeDish: onRemoveDish,
          addPicture: onAddPicture,
          removePicture: onRemovePicture,
          isUberAvailable,
          onShowImportModalClick,
          hasPosIntegration
        }}
      />
      {confirmModalData && (
        <Confirm open onClose={hideModal} onConfirm={onConfirm}>
          {confirmModalData.title}
        </Confirm>
      )}
      {showImportModal && <ImportModal onClose={onHideImportModal} />}
    </AppManagerLayout>
  );
};

MenuPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

MenuPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  dishes: shape(),
  business: shape(),
  categories: shape(),
  addDish: func.isRequired,
  addToUber: func.isRequired,
  updateDish: func.isRequired,
  removeDish: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  loading: bool.isRequired,
  businesses: shape(),
  businessId: string,
  uploadMenu: func.isRequired,
  downloadMenu: func.isRequired,
  isUberAvailable: bool,
  hasPosIntegration: bool.isRequired
};

MenuPage.defaultProps = {
  business: {},
  categories: {},
  businessId: "",
  businesses: null,
  dishes: null,
  isUberAvailable: false
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(
    (state, { i18n }) => {
      const isUberConnected = state.getIn(["uberIntegrations"]);
      const isUberAvailable =
        isUberConnected && isUberConnected.get("isConnectedToUberEats");
      const hasPosIntegration = state.getIn([
        "integrations",
        "hasPosCurrentBusiness"
      ]);
      const businessData = state.getIn(["users", "currentBusiness", "data"]);
      const business =
        businessData &&
        businessData.get("businesses") &&
        businessData.get("businesses").first();
      const categories = state.getIn(["categories", "data", "categories"]);
      const loadingDishes =
        (!state.getIn(["dishes", "isFailed"]) &&
          !state.getIn(["dishes", "isSucceeded"])) ||
        state.getIn(["dishes", "isFetching"]);
      const loadingCategories =
        (!state.getIn(["categories", "isFailed"]) &&
          !state.getIn(["categories", "isSucceeded"])) ||
        state.getIn(["categories", "isFetching"]);

      return {
        isUberAvailable,
        loading: loadingDishes || loadingCategories,
        dishes: selectDenormalizedDishes(state),
        categories,
        business: business && business.get("attributes"),
        businessId: business && business.get("id"),
        businesses: state.getIn([
          "users",
          "profileBusinesses",
          "data",
          "businesses"
        ]),
        lng: (i18n && i18n.language) || "en",
        hasPosIntegration
      };
    },
    {
      addDish: postDish,
      updateDish: patchDish,
      removeDish: deleteDish,
      addPicture: postPicture,
      removePicture: deletePicture,
      uploadMenu: uploadMenuToUberEats,
      downloadMenu: downloadMenuFromUberEats
    }
  )
)(MenuPage);
