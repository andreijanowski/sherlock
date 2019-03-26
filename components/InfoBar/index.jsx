import { node, string } from "prop-types";
import { Wrapper, InfoWrapper, Info, Complete } from "./styled";

const InfoBar = ({ info, complete }) => (
  <Wrapper>
    <InfoWrapper>
      <Info>INFO</Info>
      {info}
    </InfoWrapper>
    <Complete>{complete}</Complete>
  </Wrapper>
);

InfoBar.propTypes = {
  info: node.isRequired,
  complete: string.isRequired
};

export default InfoBar;
