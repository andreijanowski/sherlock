import { func, arrayOf, shape } from "prop-types";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";

const Deliveries = ({ deliveries, removeDelivery, addDelivery, t }) => (
  <Wrapper>
    <Form {...{ addDelivery, t }} />
    <List {...{ deliveries, removeDelivery, t }} />
  </Wrapper>
);

Deliveries.propTypes = {
  t: func.isRequired,
  deliveries: arrayOf(shape()).isRequired,
  removeDelivery: func.isRequired,
  addDelivery: func.isRequired
};

export default Deliveries;
