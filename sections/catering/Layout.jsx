import { func, string, node, shape, arrayOf, bool } from "prop-types";
import AppLayout from "layout/App";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { Select, ActionIcon } from "components";
import { Box } from "@rebass/grid";
import { Router } from "routes";
import { preparePeriodsList } from "./utils";
import { AddIconWrapper, ActionBarWrapper } from "./styled";

const CateringLayout = ({
  t,
  lng,
  view,
  isAddActionHidden,
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
    <ActionBarWrapper width={1} mb={3} flexWrap="wrap">
      <Box width={[1, 1 / 3]} pr={[0, 3]} pb={[1, 0]}>
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
      {view && (
        <Box width={[1, 1 / 4]}>
          <Select
            value={view}
            items={preparePeriodsList(t)}
            onChange={p => Router.pushRoute(`/${lng}/app/catering/${p.value}/`)}
          />
        </Box>
      )}
      {!isAddActionHidden && (
        <AddIconWrapper width={["auto", 5 / 12]}>
          <ActionIcon
            size="sm"
            icon={["fa", "plus"]}
            white
            onClick={() => Router.pushRoute(`/${lng}/app/catering/create/`)}
          />
        </AddIconWrapper>
      )}
    </ActionBarWrapper>
    {children}
  </AppLayout>
);

CateringLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  view: shape().isRequired,
  children: node.isRequired,
  business: shape(),
  isAddActionHidden: bool,
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

CateringLayout.defaultProps = {
  business: null,
  businesses: null,
  isAddActionHidden: false
};

export default CateringLayout;
