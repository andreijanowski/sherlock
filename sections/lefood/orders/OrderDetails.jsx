import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu";
import { func, bool, shape } from "prop-types";
import {
  OrderDetailsHeader,
  OrderDetailsSubheader,
  OrderDetailsSpacer,
  OrderDetailsState
} from "./styled";
import OrderDetail from "./OrderDetail";
import PersonalInformation from "./PersonalInformation";

const OrderDetails = ({ isOpen, onStateChange, orderDetails, t }) => (
  <Slide
    isOpen={isOpen}
    onStateChange={onStateChange}
    pageWrapId="app"
    outerContainerId="layout"
    right
    width={400}
  >
    {orderDetails && (
      <>
        <OrderDetailsHeader>{t("orderDetails")}</OrderDetailsHeader>
        <OrderDetailsState>
          <div>
            {t("orderState")}: {t(orderDetails.state)}
          </div>
          {orderDetails.state === "rejected" &&
            `${t("rejectReason")}: ${orderDetails.otherRejectionReason ||
              t(orderDetails.rejectReason)}`}
        </OrderDetailsState>
        {orderDetails.elements.map(
          ({ units, dishName, dishPricePerItemCents, currency }) => (
            <OrderDetail
              {...{
                name: `${units}x ${dishName}`,
                price: dishPricePerItemCents,
                currency
              }}
            />
          )
        )}
        <OrderDetail
          {...{
            name: t("delivery"),
            price: orderDetails.shippingCostCents,
            currency: orderDetails.currency
          }}
        />
        <OrderDetail
          {...{
            name: t("total"),
            price: orderDetails.totalCostCents,
            currency: orderDetails.currency,
            bold: true
          }}
        />
        <OrderDetailsSpacer />
        <OrderDetailsSubheader>
          {t("personalInformation")}
        </OrderDetailsSubheader>
        <PersonalInformation
          {...{ name: t("email"), value: orderDetails.userEmail }}
        />
        <PersonalInformation
          {...{ name: t("phone"), value: orderDetails.userPhone }}
        />
      </>
    )}
  </Slide>
);

OrderDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  orderDetails: shape().isRequired,
  t: func.isRequired
};

export default reduxBurgerMenu(OrderDetails);
