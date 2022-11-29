import React, { useEffect } from "react";
import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { func, bool, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { Map } from "immutable";
import { connect } from "react-redux";

import {
  Button,
  FormDropdown,
  SliderDetail,
  SliderHeader,
  SliderSubheader,
  SliderSpacer
} from "components";
import { SliderStyles } from "components/Slider";
import { fetchOrkestroOrder } from "actions/orders";
import { getOrderSource } from "utils/orderUtils";
import { selectIsConnectedWithOrkestro } from "selectors/integrations";
import { useTranslation } from "i18n";
import OrderDetail from "./OrderDetail";
import { isPickupOrder } from "../utils";

const OrderDetails = ({
  isOpen,
  onStateChange,
  orderDetails,
  setRejectModalVisibility,
  updateOrder,
  fetchOrkestroOrderStatus,
  connectedWithOrkestro
}) => {
  const { t } = useTranslation("lefood");
  const orderId = orderDetails && orderDetails.get("id");
  const notes = orderDetails && orderDetails.getIn(["attributes", "notes"]);
  const deliveryNotes = Map.isMap(notes) && notes.get("deliveryNotes");
  const disposableItems = Map.isMap(notes) && notes.get("disposableItems");
  const specialInstructions =
    Map.isMap(notes) && notes.get("specialInstructions");

  const isPickup = orderDetails && isPickupOrder(orderDetails);

  const source = getOrderSource(orderDetails);

  // we need to check, was it order created, when
  // orkestro delivery was enabled
  const withOrkestroDelivery =
    orderDetails && orderDetails.getIn(["attributes", "withOrkestroDelivery"]);

  const shouldFetchOrkestroOrderStatus =
    isOpen && !isPickup && withOrkestroDelivery;

  useEffect(() => {
    if (shouldFetchOrkestroOrderStatus) {
      fetchOrkestroOrderStatus(orderId);
    }
  }, [fetchOrkestroOrderStatus, orderId, shouldFetchOrkestroOrderStatus]);

  return (
    <Slide
      isOpen={isOpen}
      onStateChange={onStateChange}
      pageWrapId="app"
      outerContainerId="layout"
      right
      width={400}
    >
      <SliderStyles />
      {orderDetails && (
        <>
          <SliderHeader>{t("orderDetails")}</SliderHeader>
          <SliderSubheader isDetails>
            {`ID: ${orderDetails.getIn(["attributes", "shortId"])}
            `}
            {source && <Flex justifyContent="flex-end">{source}</Flex>}
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
                    key: element.getIn(["id"]),
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
                      orderDetails.getIn(["attributes", "currency"]),
                    options: element.getIn([
                      "relationships",
                      "elementOptions",
                      "data"
                    ])
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
          <SliderDetail
            {...{
              name: t("collectionTime"),
              value: [orderDetails.getIn(["attributes", "collectionAt"])]
            }}
          />
          <SliderDetail
            {...{
              name: t("collectionCode"),
              value: [orderDetails.getIn(["attributes", "collectionCode"])]
            }}
          />
          <SliderDetail
            {...{
              name: t("customerNotes"),
              value: [deliveryNotes]
            }}
          />
          <br />
          <SliderSubheader>{t("personalInformation")}</SliderSubheader>
          <SliderDetail
            {...{
              name: t("customerName"),
              value: [orderDetails.getIn(["attributes", "customerName"])]
            }}
          />
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
          {isPickup && (
            <SliderDetail
              {...{
                name: t("deliveryAddress"),
                value: [t("pickupAtRestaurant")]
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

          {!isPickup &&
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
  updateOrder: func.isRequired
};

OrderDetails.defaultProps = {
  orderDetails: null,
  connectedWithOrkestro: false
};

const mapState = state => ({
  connectedWithOrkestro: selectIsConnectedWithOrkestro(state)
});

const mapDispatch = { fetchOrkestroOrderStatus: fetchOrkestroOrder };

export default reduxBurgerMenu(connect(mapState, mapDispatch)(OrderDetails));
