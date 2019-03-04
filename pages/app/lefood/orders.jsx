import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import CateringLayout from "sections/lefood/Layout";
import Orders from "sections/lefood/orders";
import { mockData } from "sections/lefood/orders/utils";

const namespaces = ["orders", "app"];

class OrdersPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = mockData;

  handleDragEnd = ({ destination, source, draggableId }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    this.setState(state => {
      const sourceColumn = state.columns[source.droppableId];
      const newSourceOrderIds = Array.from(sourceColumn.orderIds);
      newSourceOrderIds.splice(source.index, 1);
      if (source.droppableId === destination.droppableId) {
        newSourceOrderIds.splice(destination.index, 0, draggableId);
        return {
          ...state,
          columns: {
            ...state.columns,
            [sourceColumn.id]: {
              ...sourceColumn,
              orderIds: newSourceOrderIds
            }
          }
        };
      }
      const destinationColumn = state.columns[destination.droppableId];
      const newDestinationOrderIds = Array.from(destinationColumn.orderIds);
      newDestinationOrderIds.splice(destination.index, 0, draggableId);
      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            orderIds: newSourceOrderIds
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            orderIds: newDestinationOrderIds
          }
        }
      };
    });
  };

  render() {
    const { t, lng } = this.props;
    return (
      <CateringLayout
        {...{
          t,
          lng
        }}
      >
        <Orders {...{ onDragEnd: this.handleDragEnd, data: this.state, t }} />
      </CateringLayout>
    );
  }
}

OrdersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(true)(withI18next(namespaces)(OrdersPage));
