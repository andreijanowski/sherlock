import { Flex } from "@rebass/grid";
import { func, bool } from "prop-types";
import { Brandmark, BrandmarkWrapper, Wordmark, Tagline } from "./styled";

const FoodetectiveLogo = ({ t, withTagline }) => (
  <Flex alignItems="center">
    <BrandmarkWrapper>
      <Brandmark />
    </BrandmarkWrapper>
    {withTagline && (
      <Wordmark>
        Sherlock
        <Tagline>{t("common:foodetectiveCompany")}</Tagline>
      </Wordmark>
    )}
  </Flex>
);

FoodetectiveLogo.propTypes = {
  t: func.isRequired,
  withTagline: bool
};

FoodetectiveLogo.defaultProps = {
  withTagline: false
};

export default FoodetectiveLogo;
