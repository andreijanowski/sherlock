import { node, string } from "prop-types";
import { Wrapper, InfoWrapper, Info, Complete } from "./styled";

const InfoBar = ({ info, complete }) => (
  <Wrapper>
    <InfoWrapper>
      <Info>INFO</Info>
      {info}
    </InfoWrapper>
    {complete && <Complete>{complete}</Complete>}
  </Wrapper>
);

InfoBar.propTypes = {
  info: node.isRequired,
  complete: string
};

InfoBar.defaultProps = {
  complete: null
};

export default InfoBar;
