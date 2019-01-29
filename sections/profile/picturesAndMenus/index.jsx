import { func, shape } from "prop-types";
import { LoadingIndicator } from "components";
import { Form } from "../styled";
import Logo from "./Logo";
import Pictures from "./Pictures";
import Menus from "./Menus";
import Products from "./Products";

const PicturesAndMenusForm = ({
  t,
  initialValues,
  saveLogo,
  addPicture,
  removePicture,
  addMenu,
  updateMenu,
  removeMenu,
  addProduct,
  updateProduct,
  removeProduct
}) =>
  initialValues ? (
    <Form>
      <Logo {...{ t, logo: initialValues.logo, saveLogo }} />
      <Pictures
        {...{
          t,
          pictures: initialValues.pictures,
          addPicture,
          removePicture
        }}
      />
      <Menus
        {...{ t, menus: initialValues.menus, addMenu, updateMenu, removeMenu }}
      />
      <Products
        {...{
          t,
          products: initialValues.products,
          addProduct,
          updateProduct,
          removeProduct
        }}
      />
    </Form>
  ) : (
    <LoadingIndicator />
  );

PicturesAndMenusForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  saveLogo: func.isRequired,
  addPicture: func.isRequired,
  removePicture: func.isRequired,
  addMenu: func.isRequired,
  updateMenu: func.isRequired,
  removeMenu: func.isRequired,
  addProduct: func.isRequired,
  updateProduct: func.isRequired,
  removeProduct: func.isRequired
};

PicturesAndMenusForm.defaultProps = {
  initialValues: null
};

export default PicturesAndMenusForm;
