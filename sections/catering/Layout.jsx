import { func, string, node, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { Select } from "components";
import { Flex, Box } from "@rebass/grid";
import { preparePeriodsList } from "./utils";

const CateringLayout = ({
  t,
  lng,
  business,
  businesses,
  changeCurrentBusiness,
  children
}) => (
  <AppLayout
    {...{
      mainIcon: "catering",
      header: t("header"),
      t,
      lng
    }}
  >
    <Flex width={1} mb={3}>
      <Box width={1 / 3} pr={3}>
        <Select
          value={{
            value: business && business.id,
            label:
              (business && business.name) ||
              t("app:manageProfile.unnamedBusiness"),
            src: business && business.logo.url
          }}
          withImage
          items={prepareBusinessesList(t, businesses)}
          onChange={b => changeCurrentBusiness(b.value)}
        />
      </Box>
      <Box width={1 / 4}>
        <Select
          value={{
            value: "month",
            label: t("month")
          }}
          items={preparePeriodsList(t)}
          onChange={p => console.log(p)}
        />
      </Box>
    </Flex>
    {children}
  </AppLayout>
);

CateringLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  children: node.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

CateringLayout.defaultProps = {
  business: null,
  businesses: null
};

export default CateringLayout;
