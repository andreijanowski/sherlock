import { func, arrayOf, shape, bool } from "prop-types";
import { LoadingIndicator } from "components";
import Form from "./Form";
import List from "./List";
import { Wrapper } from "./styled";

const Deliveries = ({
  deliveries,
  removeDelivery,
  addDelivery,
  t,
  loading
}) => (
  <Wrapper>
    {loading ? (
      <LoadingIndicator />
    ) : (
      <>
        <Form {...{ addDelivery, t }} />
        <List {...{ deliveries, removeDelivery, t }} />
      </>
    )}
  </Wrapper>
);

Deliveries.propTypes = {
  t: func.isRequired,
  deliveries: arrayOf(shape()).isRequired,
  removeDelivery: func.isRequired,
  addDelivery: func.isRequired,
  loading: bool.isRequired
};

export default Deliveries;
