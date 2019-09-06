import { string, arrayOf, func } from "prop-types";
import { Name, Value, DetailWrapper } from "./styled";

const Detail = ({ name, value, onClick }) => (
  <DetailWrapper onClick={onClick}>
    <Name>{name}</Name>
    <Value>{value.map(v => (v ? <div key={v}>{v}</div> : null))}</Value>
  </DetailWrapper>
);

Detail.propTypes = {
  name: string.isRequired,
  value: arrayOf(string).isRequired,
  onClick: func
};

Detail.defaultProps = {
  onClick: undefined
};

export default Detail;
