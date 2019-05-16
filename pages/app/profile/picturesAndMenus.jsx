import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import fileToBase64 from "utils/fileToBase64";
import { func, string, shape, arrayOf } from "prop-types";
import ProfileLayout from "sections/profile/Layout";
import Form from "sections/profile/picturesAndMenus";
import { connect } from "react-redux";
import { postBusiness, patchBusiness } from "actions/businesses";
import { postPicture, deletePicture } from "actions/pictures";
import { postMenu, patchMenu, deleteMenu } from "actions/menus";
import { postProduct, patchProduct, deleteProduct } from "actions/products";
import { getInitialValues } from "sections/profile/picturesAndMenus/utils";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";

const namespaces = ["picturesAndMenus", "app", "publishModal", "forms"];

class PicturesAndMenus extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  saveLogo = logo => {
    const { updateBusiness, businessId } = this.props;
    return updateBusiness(businessId, { logo });
  };

  addPicture = photo => {
    const { addPicture, businessId } = this.props;
    return addPicture("business", businessId, photo);
  };

  removePicture = id => {
    const { removePicture } = this.props;
    return removePicture(id);
  };

  addMenus = menus => {
    const savedMenus = menus.map(m => {
      const menu = this.addMenu(m);
      return menu;
    });
    return Promise.all(savedMenus);
  };

  addMenu = async menu => {
    try {
      const { addMenu, businessId } = this.props;
      const { name } = menu;
      const file = await fileToBase64(menu);
      const res = addMenu(businessId, name, file);
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  updateMenu = (id, name) => {
    const { updateMenu } = this.props;
    return updateMenu(id, name);
  };

  removeMenu = id => {
    const { removeMenu } = this.props;
    return removeMenu(id);
  };

  addProduct = product => {
    const { addProduct, businessId } = this.props;
    return addProduct(businessId, product);
  };

  updateProduct = (id, name) => {
    const { updateProduct } = this.props;
    return updateProduct(id, name);
  };

  removeProduct = id => {
    const { removeProduct } = this.props;
    return removeProduct(id);
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businessGroups,
      businessMenus,
      businessPictures,
      businessProducts,
      businessOpenPeriods,
      businesses,
      changeCurrentBusiness,
      addBusiness,
      updateBusiness,
      getProfileBusiness
    } = this.props;
    const initialValues = getInitialValues({
      business,
      businessMenus,
      businessPictures,
      businessProducts
    });

    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businessId,
          businessGroups,
          businessMenus,
          businessPictures,
          businessProducts,
          businessOpenPeriods,
          businesses,
          changeCurrentBusiness,
          addBusiness,
          updateBusiness,
          getProfileBusiness,
          currentPage: "picturesAndMenus"
        }}
      >
        <Form
          {...{
            t,
            initialValues,
            saveLogo: this.saveLogo,
            addPicture: this.addPicture,
            removePicture: this.removePicture,
            addMenu: this.addMenus,
            updateMenu: this.updateMenu,
            removeMenu: this.removeMenu,
            addProduct: this.addProduct,
            updateProduct: this.updateProduct,
            removeProduct: this.removeProduct
          }}
        />
      </ProfileLayout>
    );
  }
}

PicturesAndMenus.propTypes = {
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
  businesses: arrayOf(shape())
};

PicturesAndMenus.defaultProps = {
  businesses: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  business: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businessGroups: businessData && businessData.get("groups"),
          businessMenus: businessData && businessData.get("menus"),
          businessPictures: businessData && businessData.get("pictures"),
          businessProducts: businessData && businessData.get("products"),
          businessOpenPeriods: businessData && businessData.get("openPeriods"),
          businesses: state.getIn(["users", "profileBusinesses", "data"])
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
        getProfileBusiness: fetchProfileBusiness
      }
    )(PicturesAndMenus)
  )
);
