import { func, string, node, shape, bool } from "prop-types";
import AppLayout from "layout/App";
import { Select, ActionIcon, ServiceStatusCheckbox } from "components";
import { Box, Flex } from "@rebass/grid";
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
  children,
  eventType,
  serviceActivationFieldName,
  updateBusiness
}) => (
  <AppLayout
    {...{
      mainIcon: eventType,
      header: t("header"),
      t,
      lng
    }}
  >
    <ActionBarWrapper
      width={1}
      mb={3}
      justifyContent="space-between"
      flexWrap={["wrap", "nowrap"]}
    >
      <Box width={1}>
        <Flex width={1} flexWrap="wrap">
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
        </Flex>
      </Box>
      <Box>
        <ServiceStatusCheckbox
          {...{
            t,
            serviceActivationFieldName,
            business,
            updateBusiness,
            businessId
          }}
        />
      </Box>
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
  eventType: string.isRequired,
  serviceActivationFieldName: string.isRequired,
  updateBusiness: func.isRequired
};

CalendarLayout.defaultProps = {
  business: null,
  businessId: "",
  isAddActionHidden: false,
  view: null
};

export default CalendarLayout;
