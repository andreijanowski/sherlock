import React from "react";
import { connect } from "react-redux";
import fileToBase64 from "utils/fileToBase64";
import { func, string, shape } from "prop-types";

import { useT } from "utils/hooks";
import { MobilePreview } from "components/Onboarding";
import PicturesForm from "sections/profile/picturesAndMenus";

import { uploadMenuToUberEats } from "actions/integrations";
import { postMenu, patchMenu, deleteMenu } from "actions/menus";
import { postBusiness, patchBusiness } from "actions/businesses";
import { postPicture, deletePicture } from "actions/pictures";
import { postProduct, patchProduct, deleteProduct } from "actions/products";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";

import { Content, Wrapper, Title, InfoWrapper, FormWrapper } from "./styled";

const ImagesMenus = ({
  addMenu,
  addPicture,
  addProduct,
  removePicture,
  removeMenu,
  removeProduct,
  businessId,
  values: initialValues,
  updateBusiness,
  updateProduct,
  updateMenu
}) => {
  const t = useT(["picturesAndMenus", "app", "publishModal", "forms"]);

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

  return (
    <FormWrapper>
      <Wrapper>
        <Title>{t("app:manageProfile.picturesAndMenus")}</Title>
        <Content>
          <InfoWrapper minWidth="800px" height="570px">
            <PicturesForm
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
                padding: "0",
                onboarding: true
              }}
            />
          </InfoWrapper>
          <MobilePreview {...initialValues} />
        </Content>
      </Wrapper>
    </FormWrapper>
  );
};

ImagesMenus.propTypes = {
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
  businessId: string,

  businessOpenPeriods: shape(),
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  businesses: shape(),
  values: shape().isRequired
};

ImagesMenus.defaultProps = {
  businesses: null,
  businessId: "",
  businessOpenPeriods: null
};

export default connect(
  null,
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
