import { WarningIcon, StopOrdersModalIcon } from "icons";
import { shape, func, bool } from "prop-types";
import { Flex } from "@rebass/grid";
import Tippy from "@tippy.js/react";

const CardDetails = ({ reservation, t, isSplited }) =>
  reservation ? (
    <Flex alignItems="center" justifyContent="space-between">
      {`${t("partySize")}: ${reservation.getIn(["attributes", "partySize"])}`}
      {isSplited && (
        <Tippy content={t("splitedCardInfo")}>
          <div>
            <WarningIcon width="25" height="21" />
          </div>
        </Tippy>
      )}
      {reservation.get("fitsSlots") === false && (
        <Tippy content={t("cardNotFitsSlotsInfo")}>
          <div>
            <StopOrdersModalIcon width="21" height="21" />
          </div>
        </Tippy>
      )}
    </Flex>
  ) : null;

CardDetails.propTypes = {
  reservation: shape().isRequired,
  t: func.isRequired,
  isSplited: bool.isRequired
};

export default CardDetails;
