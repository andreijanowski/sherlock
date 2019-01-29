import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import fileToBase64 from "utils/fileToBase64";
import { func, string, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/picturesAndMenus";
import { connect } from "react-redux";
import { patchBusiness } from "actions/businesses";
import { postPicture, deletePicture } from "actions/pictures";
import { postMenu, patchMenu, deleteMenu } from "actions/menus";
import { postProduct, patchProduct, deleteProduct } from "actions/products";
import { getInitialValues } from "sections/profile/picturesAndMenus/utils";
import {
  generateMenuItems,
  prepareBusinessesList
} from "sections/profile/utils";
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

  handleBusinessChange = b => {
    const { changeCurrentBusiness } = this.props;
    changeCurrentBusiness(b.value);
  };

  render() {
    const { t, lng, business, businesses } = this.props;
    const initialValues = getInitialValues(business);
    const businessesList = prepareBusinessesList(businesses);

    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          withMenu: true,
          menuItems: generateMenuItems(t, "picturesAndMenus"),
          select: {
            value: {
              value: business && business.id,
              label: business && business.name,
              src: business && business.logo.url
            },
            items: businessesList,
            handleChange: this.handleBusinessChange
          }
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
      </AppLayout>
    );
  }
}

PicturesAndMenus.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
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
