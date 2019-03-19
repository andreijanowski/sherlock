import { string } from "prop-types";
import { PersonalInformationName, PersonalInformationValue } from "./styled";

const PersonalInformation = ({ name, value }) => (
  <>
    <PersonalInformationName>{name}</PersonalInformationName>
    <PersonalInformationValue>{value}</PersonalInformationValue>
  </>
);

PersonalInformation.propTypes = {
  name: string.isRequired,
  value: string.isRequired
};

export default PersonalInformation;
