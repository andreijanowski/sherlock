import { string, arrayOf } from "prop-types";
import { Name, Value } from "./styled";

const Detail = ({ name, value }) => (
  <>
    <Name>{name}</Name>
    <Value>{value.map(v => (v ? <div key={v}>{v}</div> : null))}</Value>
  </>
);

Detail.propTypes = {
  name: string.isRequired,
  value: arrayOf(string).isRequired
};

export default Detail;
