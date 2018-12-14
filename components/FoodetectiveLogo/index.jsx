import { Flex } from "@rebass/grid";
import { func } from "prop-types";
import { Brandmark, BrandmarkWrapper, Wordmark, Tagline } from "./styled";

const FoodetectiveLogo = ({ t }) => (
  <Flex alignItems="baseline">
    <BrandmarkWrapper>
      <Brandmark />
    </BrandmarkWrapper>
    <Wordmark>Foodetective </Wordmark>
    <Tagline>{t("common:forBusiness")}</Tagline>
  </Flex>
);

FoodetectiveLogo.propTypes = {
  t: func.isRequired
};

export default FoodetectiveLogo;
