import { Flex } from "@rebass/grid";
import { bool } from "prop-types";
import { Wordmark } from "components";
import { Brandmark, BrandmarkWrapper } from "./styled";

const FoodetectiveLogo = ({ withTagline }) => (
  <Flex alignItems="center">
    <BrandmarkWrapper>
      <Brandmark />
    </BrandmarkWrapper>
    {withTagline && <Wordmark />}
  </Flex>
);

FoodetectiveLogo.propTypes = {
  withTagline: bool
};

FoodetectiveLogo.defaultProps = {
  withTagline: false
};

export default FoodetectiveLogo;
