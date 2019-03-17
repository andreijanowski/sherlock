import { func, shape } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import isServer from "utils/isServer";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";
import RejectModal from "./RejectModal";
import StopOrdersModal from "./StopOrdersModal";
import FinishOrdersModal from "./FinishOrdersModal";

const Orders = ({ onDragEnd, data, t }) => (
  <>
    <DragDropContext {...{ onDragEnd }}>
      <ColumnsWrapper>
        {Object.values(data.columns).map(column => {
          const orders = column.orderIds.map(id => data.orders[id]);
          return (
            <Column
              {...{ ...column, orders, t, onClick: onDragEnd, key: column.id }}
            />
          );
        })}
      </ColumnsWrapper>
    </DragDropContext>
    {!isServer && <RejectModal {...{ open: true, onClose: () => null, t }} />}
    {!isServer && (
      <StopOrdersModal {...{ open: true, onClose: () => null, t }} />
    )}
    {!isServer && (
      <FinishOrdersModal {...{ open: true, onClose: () => null, t }} />
    )}
  </>
);

Orders.propTypes = {
  t: func.isRequired,
  onDragEnd: func.isRequired,
  data: shape().isRequired
};

export default Orders;
