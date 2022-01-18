import { Flex } from "@rebass/grid";
import { bool } from "prop-types";
import { Wordmark } from "components";
import { Fork } from "components/Icons";
import { Brandmark, BrandmarkWrapper, SquaredBrandmark } from "./styled";

const FoodetectiveLogo = ({ withTagline, squared }) => (
  <Flex alignItems="center">
    <BrandmarkWrapper squared={squared}>
      {squared ? (
        <SquaredBrandmark>
          <Fork />
        </SquaredBrandmark>
      ) : (
        <Brandmark />
      )}
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
