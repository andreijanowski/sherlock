import { func, shape } from "prop-types";
import { Form } from "../styled";
import Logo from "./Logo";
import Pictures from "./Pictures";
import Menu from "./Menu";
import MustTry from "./MustTry";

const PicturesAndMenusForm = ({ t, initialValues, saveLogo }) =>
  initialValues ? (
    <Form>
      {console.log(initialValues)}
      <Logo {...{ t, logo: initialValues.logo, saveLogo }} />
      <Pictures {...{ t }} />
      <Menu
        {...{ t }}
        onDrop={(a, r) => {
          console.log({ a, r });
        }}
      />
      <MustTry {...{ t }} />
    </Form>
  ) : null;

PicturesAndMenusForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  saveLogo: func.isRequired
};

PicturesAndMenusForm.defaultProps = {
  initialValues: null
};

export default PicturesAndMenusForm;
