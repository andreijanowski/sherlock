import { string, arrayOf } from "prop-types";
import { PersonalInformationName, PersonalInformationValue } from "./styled";

const PersonalInformation = ({ name, value }) => (
  <>
    <PersonalInformationName>{name}</PersonalInformationName>
    <PersonalInformationValue>
      {value.map(v => (
        <div>{v}</div>
      ))}
    </PersonalInformationValue>
  </>
);

PersonalInformation.propTypes = {
  name: string.isRequired,
  value: arrayOf(string).isRequired
};

export default PersonalInformation;
