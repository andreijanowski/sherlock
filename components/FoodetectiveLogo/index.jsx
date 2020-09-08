import { Flex } from "@rebass/grid";
import { bool } from "prop-types";
import { Wordmark } from "components";
import { Brandmark, SquaredBrandmark, BrandmarkWrapper } from "./styled";

const FoodetectiveLogo = ({ withTagline, squared }) => (
  <Flex alignItems="center">
    <BrandmarkWrapper squared={squared}>
      {squared ? <SquaredBrandmark /> : <Brandmark />}
    </BrandmarkWrapper>
    {withTagline && <Wordmark />}
  </Flex>
);

FoodetectiveLogo.propTypes = {
  withTagline: bool,
  squared: bool
};

FoodetectiveLogo.defaultProps = {
  withTagline: false,
  squared: false
};

export default FoodetectiveLogo;
