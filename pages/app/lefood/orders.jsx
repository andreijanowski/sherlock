import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/lefood/Layout";
import Orders from "sections/lefood/orders";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/users";
import { mockData } from "sections/lefood/orders/utils";

const namespaces = ["catering", "app"];

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
    const { t, lng, business, businesses, changeCurrentBusiness } = this.props;
    return (
      <CateringLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness
        }}
      >
        <Orders {...{ onDragEnd: this.handleDragEnd, data: this.state }} />
      </CateringLayout>
    );
  }
}

OrdersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

OrdersPage.defaultProps = {
  business: null,
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(OrdersPage)
  )
);
