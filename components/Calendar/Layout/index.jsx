import { func, string, node, shape, bool } from "prop-types";
import AppLayout from "layout/App";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { Select, ActionIcon } from "components";
import { Box } from "@rebass/grid";
import { Router } from "routes";
import { preparePeriodsList } from "../utils";
import { AddIconWrapper, ActionBarWrapper } from "./styled";

const CalendarLayout = ({
  t,
  lng,
  view,
  isAddActionHidden,
  business,
  businessId,
  businesses,
  changeCurrentBusiness,
  children,
  eventType
}) => (
  <AppLayout
    {...{
      mainIcon: eventType,
      header: t("header"),
      t,
      lng
    }}
  >
    <ActionBarWrapper width={1} mb={3} flexWrap="wrap">
      <Box width={[1, 1 / 3]} pr={[0, 3]} pb={[1, 0]}>
        <Select
          value={{
            value: businessId,
            label:
              (business && business.get("name")) ||
              t("app:manageProfile.unnamedBusiness"),
            src: business && business.getIn(["logo", "url"])
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
            onChange={p =>
              Router.pushRoute(`/${lng}/app/${eventType}/${p.value}/`)
            }
          />
        </Box>
      )}
      {!isAddActionHidden && (
        <AddIconWrapper width={["auto", 5 / 12]}>
          <ActionIcon
            size="sm"
            icon={["fa", "plus"]}
            white
            onClick={() => {
              Router.pushRoute(`/${lng}/app/${eventType}/create/`);
            }}
          />
        </AddIconWrapper>
      )}
    </ActionBarWrapper>
    {children}
  </AppLayout>
);

CalendarLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  view: shape(),
  children: node.isRequired,
  business: shape(),
  businessId: string,
  isAddActionHidden: bool,
  changeCurrentBusiness: func.isRequired,
  businesses: shape(),
  eventType: string.isRequired
};

CalendarLayout.defaultProps = {
  business: null,
  businesses: null,
  businessId: "",
  isAddActionHidden: false,
  view: null
};

export default CalendarLayout;