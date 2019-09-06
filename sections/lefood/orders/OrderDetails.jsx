import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { func, bool, shape } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import {
  Button,
  FormDropdown,
  SliderDetail,
  SliderHeader,
  SliderSubheader,
  SliderSpacer
} from "components";
import OrderDetail from "./OrderDetail";

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
        <SliderHeader>{t("orderDetails")}</SliderHeader>
        <SliderSubheader>
          {`ID: ${orderDetails.getIn(["attributes", "shortId"])}`}
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
                  price: element.getIn(["attributes", "dishPricePerItemCents"]),
                  currency:
                    element.getIn(["attributes", "currency"]) ||
                    orderDetails.getIn(["attributes", "currency"])
                }}
              />
            ))}
        <OrderDetail
          {...{
            name: t("delivery"),
            price: orderDetails.getIn(["attributes", "shippingCostCents"]),
            currency: orderDetails.getIn(["attributes", "currency"])
          }}
        />
        <OrderDetail
          {...{
            name: t("total"),
            price: orderDetails.getIn(["attributes", "totalCostCents"]),
            currency: orderDetails.getIn(["attributes", "currency"]),
            isBold: true
          }}
        />
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
        {orderDetails.getIn(["attributes", "pickupAtBusiness"]) && (
          <SliderDetail
            {...{
              name: t("deliveryAddress"),
              value: [t("pickupAtRestaurant")]
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
                {address.getIn(["attributes", "notes"]) && (
                  <SliderDetail
                    {...{
                      name: t("deliveryNotes"),
                      value: [address.getIn(["attributes", "notes"])]
                    }}
                  />
                )}
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

OrderDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  orderDetails: shape(),
  setRejectModalVisibility: func.isRequired,
  updateOrder: func.isRequired,
  t: func.isRequired
};

OrderDetails.defaultProps = {
  orderDetails: null
};

export default reduxBurgerMenu(OrderDetails);
