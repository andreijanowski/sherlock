import { func, shape, string } from "prop-types";
import { LoadingIndicator, MenusUploader } from "components";
import { Form } from "../styled";
import Logo from "./Logo";
import Pictures from "./Pictures";
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
  removeProduct,
  addToUber,
  padding
}) =>
  initialValues ? (
    <Form p={padding || [3, 4]}>
      <Logo {...{ t, logo: initialValues.logo, saveLogo }} />
      <Pictures
        {...{
          t,
          pictures: initialValues.pictures,
          addPicture,
          removePicture
        }}
      />
      <MenusUploader
        {...{
          t,
          menus: initialValues.menus,
          addMenu,
          updateMenu,
          removeMenu,
          addToUber
        }}
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
  removeProduct: func.isRequired,
  addToUber: func.isRequired,
  padding: string
};

PicturesAndMenusForm.defaultProps = {
  initialValues: null,
  padding: ""
};

export default PicturesAndMenusForm;
