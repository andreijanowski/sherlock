import { func } from "prop-types";

const Orders = ({ t }) => t("orders");

Orders.propTypes = {
  t: func.isRequired
};

export default Orders;
