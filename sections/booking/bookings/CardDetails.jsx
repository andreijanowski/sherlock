import { WarningIcon } from "icons";
import { string, shape, func } from "prop-types";
import { Flex } from "@rebass/grid";
import Tippy from "@tippy.js/react";

const CardDetails = ({ id, bookings, t }) => (
  <Flex alignItems="center" justifyContent="space-between">
    {`${t("partySize")}: ${bookings.getIn([id, "attributes", "partySize"])}`}
    <Tippy content="Hello">
      <div>
        <WarningIcon width="25" height="21" />
      </div>
    </Tippy>
  </Flex>
);

CardDetails.propTypes = {
  id: string.isRequired,
  bookings: shape().isRequired,
  t: func.isRequired
};

export default CardDetails;
