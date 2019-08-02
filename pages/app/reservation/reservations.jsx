import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import ReservationLayout from "sections/reservation/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import {
  parseReservations,
  prepareTimelineSlots,
  getSlotClosestToPresent,
  getSlotFromMoment,
  getTableReservations
} from "sections/reservation/utils";
import Reservations from "sections/reservation/reservations";
import ReservationDetails from "sections/reservation/reservations/ReservationDetails";
import TableDetails from "sections/reservation/reservations/TableDetails";
import moment from "moment";
import { SliderStyles } from "components";
import { action as toggleMenu } from "redux-burger-menu/immutable";
import { patchBusiness } from "actions/businesses";

const namespaces = ["reservation", "app", "forms"];

class ReservationsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    const { reservations, tables, openPeriods, t, business } = props;
    const choosenDate = moment();
    const slots = openPeriods
      ? prepareTimelineSlots({
          openPeriods,
          choosenDate,
          slotDuration: business.get("timeSlots")
        })
      : [];

    this.state = {
      columns: parseReservations(reservations, tables, t),
      choosenDate,
      slots,
      choosenSlot: getSlotClosestToPresent(slots),
      draggableId: undefined,
      reservationDetailsId: undefined,
      tableDetailsId: undefined
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { reservations, tables, openPeriods, business } = this.props;
    const {
      reservations: prevReservations,
      tables: prevTables,
      openPeriods: prevOpenPeriods,
      business: prevBusiness
    } = prevProps;
    const { choosenDate } = this.state;
    const { choosenDate: prevChoosenDate } = prevState;
    if (reservations !== prevReservations || tables !== prevTables) {
      this.refreshColumnsContent();
    }
    if (
      openPeriods !== prevOpenPeriods ||
      choosenDate !== prevChoosenDate ||
      (business && business.get("timeSlots")) !==
        (prevBusiness && prevBusiness.get("timeSlots"))
    ) {
      this.refreshPeriods();
    }
  }

  refreshColumnsContent = () => {
    const { reservations, tables, t } = this.props;
    this.setState({
      columns: parseReservations(reservations, tables, t)
    });
  };

  refreshPeriods = () => {
    const { openPeriods, reservations, business } = this.props;
    const { choosenDate, draggableId } = this.state;
    const slots = openPeriods
      ? prepareTimelineSlots({
          openPeriods,
          choosenDate,
          slotDuration: business.get("timeSlots")
        })
      : [];
    const reservationFrom =
      reservations && reservations.getIn([draggableId, "attributes", "from"]);
    const choosenSlot = reservationFrom
      ? getSlotFromMoment(slots, reservationFrom)
      : getSlotClosestToPresent(slots);
    this.setState({
      slots,
      choosenSlot
    });
  };

  handleDragStart = ({ draggableId }) => {
    const { reservations } = this.props;
    const reservationDate =
      reservations && reservations.getIn([draggableId, "attributes", "date"]);
    this.setState({
      draggableId,
      choosenDate: moment(reservationDate)
    });
  };

  handleDragEnd = ({ destination, source, draggableId }) => {
    console.log({ destination, source, draggableId });
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      this.setState(state => ({
        draggableId: undefined,
        choosenSlot:
          state.choosenSlot !== undefined
            ? state.choosenSlot
            : getSlotClosestToPresent(state.slots)
      }));
      return;
    }

    this.setState(state => {
      const sourceColumn = state.columns[source.droppableId];
      const newSourceReservationIds = Array.from(sourceColumn.reservationIds);
      newSourceReservationIds.splice(source.index, 1);
      if (source.droppableId === destination.droppableId) {
        newSourceReservationIds.splice(destination.index, 0, draggableId);
        return {
          ...state,
          draggableId: undefined,
          choosenSlot:
            state.choosenSlot !== undefined
              ? state.choosenSlot
              : getSlotClosestToPresent(state.slots),
          columns: {
            ...state.columns,
            [sourceColumn.id]: {
              ...sourceColumn,
              reservationIds: newSourceReservationIds
            }
          }
        };
      }
      const destinationColumn = state.columns[destination.droppableId];
      const newDestinationReservationIds = Array.from(
        destinationColumn.reservationIds
      );
      newDestinationReservationIds.splice(destination.index, 0, draggableId);
      return {
        ...state,
        draggableId: undefined,
        choosenSlot:
          state.choosenSlot !== undefined
            ? state.choosenSlot
            : getSlotClosestToPresent(state.slots),
        columns: {
          ...state.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            reservationIds: newSourceReservationIds
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            reservationIds: newDestinationReservationIds
          }
        }
      };
    });
  };

  handleToggleReservationDetails = reservationDetailsId => {
    const { toggleReservationDetails } = this.props;
    this.setState({ reservationDetailsId });
    toggleReservationDetails(!!reservationDetailsId);
  };

  handleToggleTableDetails = tableDetailsId => {
    const { toggleTableDetails } = this.props;
    this.setState({ tableDetailsId });
    toggleTableDetails(!!tableDetailsId);
  };

  chooseDate = choosenDate => this.setState({ choosenDate });

  chooseSlot = choosenSlot => this.setState({ choosenSlot });

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      reservations,
      tables,
      updateBusiness,
      changeCurrentBusiness
    } = this.props;

    const {
      columns,
      choosenDate,
      slots,
      choosenSlot,
      reservationDetailsId,
      tableDetailsId
    } = this.state;

    const reservationDetails =
      reservationDetailsId && reservations
        ? reservations.get(reservationDetailsId)
        : null;

    const tableDetails =
      tableDetailsId && tables ? tables.get(tableDetailsId) : null;

    const tableReservations =
      tableDetailsId && reservations
        ? getTableReservations(tableDetailsId, reservations)
        : null;

    return (
      <ReservationLayout
        {...{
          t,
          lng,
          page: "reservations",
          currentBusinessId: businessId,
          business,
          businesses,
          changeCurrentBusiness,
          updateBusiness
        }}
      >
        <Reservations
          {...{
            onDragEnd: this.handleDragEnd,
            onDragStart: this.handleDragStart,
            columns,
            reservations,
            slots,
            choosenDate,
            choosenSlot,
            handleCardClick: this.handleToggleReservationDetails,
            handleTableClick: this.handleToggleTableDetails,
            chooseDate: this.chooseDate,
            chooseSlot: this.chooseSlot,
            t
          }}
        />
        <SliderStyles />
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          <ReservationDetails
            {...{
              reservationDetails,
              t,
              updateReservation: this.updateReservation
            }}
          />
        </div>
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          <TableDetails
            {...{
              tableDetails,
              tableReservations,
              t
            }}
          />
        </div>
      </ReservationLayout>
    );
  }
}

ReservationsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: shape(),
  reservations: shape(),
  tables: shape(),
  openPeriods: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired,
  toggleReservationDetails: func.isRequired,
  toggleTableDetails: func.isRequired,
  updateBusiness: func.isRequired
};

ReservationsPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  reservations: null,
  tables: null,
  openPeriods: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        const reservations = state.getIn([
          "reservations",
          "data",
          "reservations"
        ]);
        const tables = state.getIn(["tables", "data", "tables"]);

        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          openPeriods: businessData && businessData.get("openPeriods"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          reservations,
          tables: tables
            ? tables.sortBy(table => table.getIn(["attributes", "number"]))
            : tables
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        toggleReservationDetails: isOpen =>
          toggleMenu(isOpen, "ReservationDetails"),
        toggleTableDetails: isOpen => toggleMenu(isOpen, "TableDetails"),
        updateBusiness: patchBusiness
      }
    )(ReservationsPage)
  )
);
