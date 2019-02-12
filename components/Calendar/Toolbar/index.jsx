import { string } from "prop-types";
import { Period } from "./styled";

const Toolbar = ({ label }) => <Period>{label}</Period>;

Toolbar.propTypes = {
  label: string.isRequired
};

export default Toolbar;
