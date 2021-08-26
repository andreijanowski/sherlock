import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { func, bool, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { Map } from "immutable";
import {
  Button,
  FormDropdown,
  SliderDetail,
  SliderHeader,
  SliderSubheader,
  SliderSpacer
} from "components";
import { connect } from "react-redux";
import { fetchOrkestroOrder } from "actions/orders";
import React, { useEffect } from "react";
import OrderDetail from "./OrderDetail";
import LogoIcon from "./LogoIcon";

const OrderDetails = ({
  isOpen,
  onStateChange,
  orderDetails,
  setRejectModalVisibility,
  updateOrder,
  fetchOrkestroOrderStatus,
  connectedWithOrkestro,
  t
}) => {
  const orderId = orderDetails && orderDetails.get("id");
  const orderOrigin =
    orderDetails && orderDetails.getIn(["attributes", "origin"]);
  const notes = orderDetails && orderDetails.getIn(["attributes", "notes"]);

  const deliveryNotes = Map.isMap(notes) && notes.get("deliveryNotes");
  const disposableItems = Map.isMap(notes) && notes.get("disposableItems");
  const specialInstructions =
    Map.isMap(notes) && notes.get("specialInstructions");

  useEffect(() => {
    if (isOpen) {
      fetchOrkestroOrderStatus(orderId);
    }
  }, [fetchOrkestroOrderStatus, isOpen, orderId]);

  return (
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
          <SliderHeader>{t("orderDetails")}</SliderHeader>
          <SliderSubheader isDetails>
            {`ID: ${orderDetails.getIn(["attributes", "shortId"])}
            `}
            <LogoIcon
              icon={
                orderOrigin === null
                  ? "logoFoodetectiveSquared"
                  : "uber_eats_logo"
              }
            />
          </SliderSubheader>
          <FormDropdown
            {...{
              input: {
                value: orderDetails.getIn(["attributes", "state"]),
                onChange: state => {
                  if (state === "rejected") {
                    setRejectModalVisibility(orderDetails.get("id"));
                  } else {
                    updateOrder(state, orderDetails.get("id"));
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
                { label: t("in_delivery"), value: "in_delivery" },
                { label: t("completed"), value: "completed" },
                { label: t("canceled"), value: "canceled" },
                { label: t("rejected"), value: "rejected" }
              ],
              label: t("orderState")
            }}
          />
          {orderDetails.getIn(["attributes", "state"]) === "rejected" &&
            `${t("rejectReason")}: ${orderDetails.getIn([
              "attributes",
              "otherRejectionReason"
            ]) || t(orderDetails.getIn(["attributes", "rejectReason"]))}`}
          {orderDetails.getIn(["relationships", "elements", "data"]) &&
            orderDetails
              .getIn(["relationships", "elements", "data"])
              .map(element => (
                <OrderDetail
                  {...{
                    key: element.getIn(["attributes", "dishName"]),
                    name: `${element.getIn([
                      "attributes",
                      "units"
                    ])}x ${element.getIn(["attributes", "dishName"])}`,
                    price: element.getIn([
                      "attributes",
                      "dishPricePerItemCents"
                    ]),
                    notes: element.getIn(["attributes", "notes"]),
                    currency:
                      element.getIn(["attributes", "currency"]) ||
                      orderDetails.getIn(["attributes", "currency"])
                  }}
                />
              ))}
          {connectedWithOrkestro ? (
            <React.Fragment>
              <OrderDetail
                {...{
                  name: t("deliveryForCustomer"),
                  price: orderDetails.getIn([
                    "attributes",
                    "shippingCostForCustomerCents"
                  ]),
                  currency: orderDetails.getIn(["attributes", "currency"])
                }}
              />
              <OrderDetail
                {...{
                  name: t("deliveryForBusiness"),
                  price: orderDetails.getIn([
                    "attributes",
                    "shippingCostForBusinessCents"
                  ]),
                  currency: orderDetails.getIn(["attributes", "currency"])
                }}
              />{" "}
            </React.Fragment>
          ) : (
            <OrderDetail
              {...{
                name: t("deliveryForCustomer"),
                price: orderDetails.getIn(["attributes", "shippingCostCents"]),
                currency: orderDetails.getIn(["attributes", "currency"])
              }}
            />
          )}
          <OrderDetail
            {...{
              name: t("total"),
              price: orderDetails.getIn(["attributes", "totalCostCents"]),
              currency: orderDetails.getIn(["attributes", "currency"]),
              isBold: true
            }}
          />
          {/* orkestroStatus */}
          <SliderSpacer />
          <SliderSubheader>{t("personalInformation")}</SliderSubheader>
          <SliderDetail
            {...{
              name: t("email"),
              value: [orderDetails.getIn(["attributes", "userEmail"])]
            }}
          />
          <SliderDetail
            {...{
              name: t("phone"),
              value: [orderDetails.getIn(["attributes", "userPhone"])]
            }}
          />
          <SliderDetail
            {...{
              name: t("deliveryTimeWish"),
              value: [orderDetails.getIn(["attributes", "timeWish"])]
            }}
          />
          {orderDetails.getIn(["attributes", "orkestroStatus"]) && (
            <SliderDetail
              {...{
                name: t("deliveryOrkestroStatus"),
                value: [orderDetails.getIn(["attributes", "orkestroStatus"])]
              }}
            />
          )}
          {orderDetails.getIn(["attributes", "pickupAtBusiness"]) && (
            <SliderDetail
              {...{
                name: t("deliveryAddress"),
                value: [t("pickupAtRestaurant")]
              }}
            />
          )}
          {deliveryNotes && (
            <SliderDetail
              {...{
                name: t("deliveryNotes"),
                value: [deliveryNotes]
              }}
            />
          )}
          {disposableItems && (
            <SliderDetail
              {...{
                name: t("disposableItems"),
                value: [t("includeCutlery")]
              }}
            />
          )}
          {specialInstructions && (
            <SliderDetail
              {...{
                name: t("specialInstructions"),
                value: [specialInstructions]
              }}
            />
          )}

          {!orderDetails.getIn(["attributes", "pickupAtBusiness"]) &&
            orderDetails
              .getIn(["relationships", "addresses", "data"])
              .map(address => (
                <>
                  <SliderDetail
                    {...{
                      name: t("deliveryAddress"),
                      value: [
                        `${address.getIn([
                          "attributes",
                          "streetNumber"
                        ])} ${address.getIn(["attributes", "street"])}`,
                        address.getIn(["attributes", "region"])
                          ? `${address.getIn([
                              "attributes",
                              "region"
                            ])} ${address.getIn(["attributes", "regionCode"])}`
                          : "",
                        `${address.getIn([
                          "attributes",
                          "postCode"
                        ])} ${address.getIn(["attributes", "city"])}`,
                        address.getIn(["attributes", "addressLine"])
                      ]
                    }}
                  />
                </>
              ))}
          {orderDetails.getIn(["attributes", "state"]) ===
            "waiting_for_approval" && (
            <Flex mx={-1} mt={3} pb={3}>
              <Box width={1 / 2} px={1}>
                <Button
                  fluid
                  styleName="reject"
                  onClick={e => {
                    e.stopPropagation();
                    setRejectModalVisibility(orderDetails.get("id"));
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
                    updateOrder("waiting_for_payment", orderDetails.get("id"));
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
};

OrderDetails.propTypes = {
  connectedWithOrkestro: bool,
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  fetchOrkestroOrderStatus: func.isRequired,
  orderDetails: shape(),
  setRejectModalVisibility: func.isRequired,
  updateOrder: func.isRequired,
  t: func.isRequired
};

OrderDetails.defaultProps = {
  orderDetails: null,
  connectedWithOrkestro: false
};

export default reduxBurgerMenu(
  connect(
    null,
    { fetchOrkestroOrderStatus: fetchOrkestroOrder }
  )(OrderDetails)
);
