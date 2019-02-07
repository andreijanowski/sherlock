import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
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
import { setCurrentBusiness } from "actions/users";

const namespaces = ["picturesAndMenus", "app"];

class PicturesAndMenus extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  saveLogo = async logo => {
    try {
      const {
        updateBusiness,
        business: { id }
      } = this.props;
      return updateBusiness(id, { logo });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  addPicture = async photo => {
    try {
      const {
        addPicture,
        business: { id }
      } = this.props;
      return addPicture("business", id, photo);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  removePicture = async id => {
    try {
      const { removePicture } = this.props;
      return removePicture(id);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  addMenus = menus => {
    menus.forEach(m => this.addMenu(m));
  };

  addMenu = async menu => {
    try {
      const {
        addMenu,
        business: { id }
      } = this.props;
      const { name } = menu;
      const file = await fileToBase64(menu);
      return addMenu(id, name, file);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  updateMenu = async (id, name) => {
    try {
      const { updateMenu } = this.props;
      return updateMenu(id, name);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  removeMenu = async id => {
    try {
      const { removeMenu } = this.props;
      return removeMenu(id);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  addProduct = async product => {
    try {
      const {
        addProduct,
        business: { id }
      } = this.props;
      return addProduct(id, product);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  updateProduct = async (id, name) => {
    try {
      const { updateProduct } = this.props;
      return updateProduct(id, name);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  removeProduct = async id => {
    try {
      const { removeProduct } = this.props;
      return removeProduct(id);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  render() {
    const {
      t,
      lng,
      business,
      businesses,
      changeCurrentBusiness,
      addBusiness
    } = this.props;
    const initialValues = getInitialValues(business);

    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          addBusiness,
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
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

PicturesAndMenus.defaultProps = {
  businesses: null,
  business: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
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
        changeCurrentBusiness: setCurrentBusiness
      }
    )(PicturesAndMenus)
  )
);
