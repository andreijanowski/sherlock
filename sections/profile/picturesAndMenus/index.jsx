import { func } from "prop-types";
import { Form } from "../styled";
import Logo from "./Logo";
import Pictures from "./Pictures";
import Menu from "./Menu";
import MustTry from "./MustTry";

const PicturesAndMenusForm = ({ t }) => (
  <Form width={[1, 1, 1]} mx={0}>
    <Logo {...{ t }} />
    <Pictures {...{ t }} />
    <Menu
      {...{ t }}
      onDrop={(a, r) => {
        console.log({ a, r });
      }}
    />
    <MustTry {...{ t }} />
  </Form>
);

PicturesAndMenusForm.propTypes = {
  t: func.isRequired
};

export default PicturesAndMenusForm;
