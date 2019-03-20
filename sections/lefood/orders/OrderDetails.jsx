import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu";
import { func, bool, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { Button, FormDropdown } from "components";
import {
  OrderDetailsHeader,
  OrderDetailsSubheader,
  OrderDetailsSpacer,
  OrderDetailsState
} from "./styled";
import OrderDetail from "./OrderDetail";
import PersonalInformation from "./PersonalInformation";

const OrderDetails = ({
  isOpen,
  onStateChange,
  orderDetails,
  setRejectModalVisibility,
  updateOrder,
  t
}) => (
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
          <FormDropdown
            {...{
              input: {
                value: orderDetails.state,
                onChange: state => {
                  if (state === "rejected") {
                    setRejectModalVisibility(orderDetails.id);
                  } else {
                    updateOrder(state, orderDetails.id);
                  }
                }
              },
              meta: { data: {} },
              items: [
                {
                  label: t("waiting_for_approval"),
                  value: "waiting_for_approval"
                },
                {
                  label: t("waiting_for_payment"),
                  value: "waiting_for_payment"
                },
                { label: t("paid"), value: "paid" },
                { label: t("in_preparation"), value: "in_preparation" },
                { label: t("completed"), value: "completed" },
                { label: t("rejected"), value: "rejected" }
              ],
              label: t("orderState")
            }}
          />
          {orderDetails.state === "rejected" &&
            `${t("rejectReason")}: ${orderDetails.otherRejectionReason ||
              t(orderDetails.rejectReason)}`}
        </OrderDetailsState>
        {orderDetails.elements &&
          orderDetails.elements.map(
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
          {...{ name: t("email"), value: [orderDetails.userEmail] }}
        />
        <PersonalInformation
          {...{ name: t("phone"), value: [orderDetails.userPhone] }}
        />
        {orderDetails.pickupAtBusiness && (
          <PersonalInformation
            {...{
              name: t("deliveryAddress"),
              value: [t("pickupAtRestaurant")]
            }}
          />
        )}
        {!orderDetails.pickupAtBusiness && orderDetails.addresses.length > 0 && (
          <PersonalInformation
            {...{
              name: t("deliveryAddress"),
              value: [
                `${orderDetails.addresses[0].streetNumber} ${
                  orderDetails.addresses[0].street
                }`,
                orderDetails.addresses[0].region
                  ? `${orderDetails.addresses[0].region} ${
                      orderDetails.addresses[0].regionCode
                    }`
                  : "",
                `${orderDetails.addresses[0].postCode} ${
                  orderDetails.addresses[0].city
                }`,
                orderDetails.addresses[0].addressLine,
                orderDetails.addresses[0].notes
              ]
            }}
          />
        )}
        {orderDetails.state === "waiting_for_approval" && (
          <Flex mx={-1} mt={3} pb={3}>
            <Box width={1 / 2} px={1}>
              <Button
                fluid
                styleName="reject"
                onClick={e => {
                  e.stopPropagation();
                  setRejectModalVisibility(orderDetails.id);
                }}
              >
                {t("reject")}
              </Button>
            </Box>
            <Box width={1 / 2} px={1}>
              <Button
                fluid
                styleName="accept"
                onClick={e => {
                  e.stopPropagation();
                  updateOrder("waiting_for_payment", orderDetails.id);
                }}
              >
                {t("accept")}
              </Button>
            </Box>
          </Flex>
        )}
      </>
    )}
  </Slide>
);

OrderDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  orderDetails: shape().isRequired,
  setRejectModalVisibility: func.isRequired,
  updateOrder: func.isRequired,
  t: func.isRequired
};

export default reduxBurgerMenu(OrderDetails);
