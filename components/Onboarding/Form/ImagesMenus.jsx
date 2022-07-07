import React from "react";
import { connect } from "react-redux";
import fileToBase64 from "utils/fileToBase64";
import { func, string, shape } from "prop-types";

import { useT } from "utils/hooks";
import { MobilePreview } from "components/Onboarding";
import Form from "sections/profile/picturesAndMenus";
import { getInitialValues } from "sections/profile/picturesAndMenus/utils";
import { uploadMenuToUberEats } from "actions/integrations";
import { postMenu, patchMenu, deleteMenu } from "actions/menus";
import { postBusiness, patchBusiness } from "actions/businesses";
import { postPicture, deletePicture } from "actions/pictures";
import { postProduct, patchProduct, deleteProduct } from "actions/products";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";

import { Content, Wrapper, Title, InfoWrapper } from "./styled";

const ImagesMenus = ({
  business,
  businessMenus,
  businessPictures,
  businessProducts,
  addMenu,
  addPicture,
  addProduct,
  removePicture,
  removeMenu,
  removeProduct,
  businessId,
  values,
  updateBusiness,
  updateProduct,
  updateMenu
}) => {
  const t = useT(["picturesAndMenus", "app", "publishModal", "forms"]);

  const initialValues = getInitialValues({
    business,
    businessMenus,
    businessPictures,
    businessProducts
  });

  const saveLogo = logo => updateBusiness(businessId, { logo });

  const addPictureAction = photo => addPicture("business", businessId, photo);

  const removePictureAction = id => removePicture(id, "business");

  const addMenuAction = async menu => {
    try {
      const { name } = menu;
      const file = await fileToBase64(menu);
      const res = addMenu(businessId, name, file);
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const addMenus = menus => {
    const savedMenus = menus.map(m => {
      const menu = addMenuAction(m);
      return menu;
    });
    return Promise.all(savedMenus);
  };

  const addProductAction = product => addProduct(businessId, product);

  const uploadMenu = id => uploadMenuToUberEats(id);

  console.log("INIT PICTURES", initialValues);

  return (
    <Wrapper>
      <Title>{t("app:manageProfile.picturesAndMenus")}</Title>
      <Content>
        <InfoWrapper minWidth="690px" height="550px">
          <Form
            {...{
              t,
              initialValues,
              saveLogo,
              addPicture: addPictureAction,
              removePicture: removePictureAction,
              addMenu: addMenus,
              updateMenu,
              removeMenu,
              addProduct: addProductAction,
              updateProduct,
              removeProduct,
              addToUber: uploadMenu,
              padding: "0"
            }}
          />
        </InfoWrapper>
        <MobilePreview {...initialValues} {...values} />
      </Content>
    </Wrapper>
  );
};

ImagesMenus.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  addBusiness: func.isRequired,
  updateBusiness: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  addMenu: func.isRequired,
  updateMenu: func.isRequired,
  removeMenu: func.isRequired,
  addProduct: func.isRequired,
  updateProduct: func.isRequired,
  removeProduct: func.isRequired,
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  businesses: shape(),
  values: shape().isRequired
};

ImagesMenus.defaultProps = {
  businesses: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  business: null
};

export default connect(
  (state, { i18n }) => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();
    return {
      business: business && business.get("attributes"),
      businessId: business && business.get("id"),
      businessGroups: businessData && businessData.get("groups"),
      businessMenus: businessData && businessData.get("menus"),
      businessPictures: businessData && businessData.get("pictures"),
      businessProducts: businessData && businessData.get("products"),
      businessOpenPeriods: businessData && businessData.get("openPeriods"),
      businesses: state.getIn([
        "users",
        "profileBusinesses",
        "data",
        "businesses"
      ]),
      lng: (i18n && i18n.language) || "en"
    };
  },
  {
    addBusiness: postBusiness,
    updateBusiness: patchBusiness,
    addPicture: postPicture,
    removePicture: deletePicture,
    addMenu: postMenu,
    updateMenu: patchMenu,
    removeMenu: deleteMenu,
    addProduct: postProduct,
    updateProduct: patchProduct,
    removeProduct: deleteProduct,
    changeCurrentBusiness: setCurrentBusiness,
    getProfileBusiness: fetchProfileBusiness,
    uploadMenuToUberEats
  }
)(ImagesMenus);
