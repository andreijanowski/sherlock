/* eslint-disable react/no-unused-state */
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
  getTableReservations,
  getReservationTables
} from "sections/reservation/utils";
import { error } from "react-notification-system-redux";
import Reservations from "sections/reservation/reservations";
import ReservationDetails from "sections/reservation/reservations/ReservationDetails";
import TableDetails from "sections/reservation/reservations/TableDetails";
import RejectReservationModal from "sections/reservation/reservations/RejectReservationModal";
import MultipleTablesModal from "sections/reservation/reservations/MultipleTablesModal";
import moment from "moment";
import { SliderStyles } from "components";
import { action as toggleMenu } from "redux-burger-menu/immutable";
import { patchBusiness } from "actions/businesses";
import {
  deleteReservation,
  setReservationForEditing,
  patchReservation
} from "actions/reservations";

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
      destination: undefined,
      source: undefined,
      reservationDetailsId: undefined,
      tableDetailsId: undefined,
      pendingRejectionReservationId: undefined,
      isMultipleTablesModalVisible: false,
      splitedReservation: undefined
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
      choosenDate.toISOString() !== prevChoosenDate.toISOString() ||
      (business && business.get("timeSlots")) !==
        (prevBusiness && prevBusiness.get("timeSlots"))
    ) {
      this.refreshPeriods();
    }
  }

  refreshColumnsContent = () => {
    const { reservations, tables, t } = this.props;
    this.setState(({ splitedReservation }) => ({
      columns: parseReservations(reservations, tables, t, splitedReservation)
    }));
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
      reservations &&
      draggableId &&
      reservations.getIn([draggableId.split("@")[0], "attributes", "from"]);
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
    const realDraggableId = draggableId.split("@")[0];
    const reservationDate =
      reservations &&
      reservations.getIn([realDraggableId, "attributes", "date"]);
    const reservationFrom =
      reservations &&
      reservations.getIn([realDraggableId, "attributes", "from"]);
    this.setState(({ slots }) => ({
      draggableId,
      choosenSlot: reservationFrom && getSlotFromMoment(slots, reservationFrom),
      choosenDate: moment(reservationDate),
      draggedReservation: reservations.get(realDraggableId)
    }));
  };

  handleDragEnd = ({ destination, source, draggableId }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      this.setState(state => ({
        draggableId: undefined,
        draggedReservation: undefined,
        choosenSlot:
          state.choosenSlot !== undefined
            ? state.choosenSlot
            : getSlotClosestToPresent(state.slots)
      }));
      return;
    }

    const { updateReservation, reservations, tables } = this.props;
    const { splitedReservation } = this.state;

    if (splitedReservation) {
      if (source.droppableId !== destination.droppableId) {
        const [reservationId, ticketIndex] = draggableId.split("@");
        const seatsTaken = splitedReservation.tickets[ticketIndex].partySize;

        const newReservationTable = {
          id: destination.droppableId,
          seatsTaken
        };

        updateReservation(reservationId, {
          tables: [...splitedReservation.tables, newReservationTable]
        });

        this.setState(state => {
          const sourceColumn = state.columns[source.droppableId];
          const newSourceReservationIds = Array.from(
            sourceColumn.reservationIds
          );
          const newSplitedReservationTickets = Array.from(
            state.splitedReservation.tickets
          );
          newSplitedReservationTickets.splice(ticketIndex, 1);
          if (!newSplitedReservationTickets.length) {
            newSourceReservationIds.splice(source.index, 1);
          }
          return {
            draggableId: undefined,
            draggedReservation: undefined,
            splitedReservation: newSplitedReservationTickets.length
              ? {
                  ...state.splitedReservation,
                  tickets: newSplitedReservationTickets,
                  tables: [
                    ...state.splitedReservation.tables,
                    newReservationTable
                  ]
                }
              : undefined,
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
        });
      }
    } else {
      const table = tables.get(destination.droppableId);
      const seatsTaken = reservations.getIn([
        draggableId,
        "attributes",
        "partySize"
      ]);

      if (table && table.getIn(["attributes", "numberOfSeats"]) < seatsTaken) {
        this.setState({
          isMultipleTablesModalVisible: true,
          destination,
          source,
          draggableId
        });
      } else if (source.droppableId === destination.droppableId) {
        this.setState(state => {
          const sourceColumn = state.columns[source.droppableId];
          const newSourceReservationIds = Array.from(
            sourceColumn.reservationIds
          );
          newSourceReservationIds.splice(source.index, 1);
          newSourceReservationIds.splice(destination.index, 0, draggableId);
          return {
            draggableId: undefined,
            draggedReservation: undefined,
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
        });
      } else {
        updateReservation(draggableId, {
          tables: [
            {
              id: destination.droppableId,
              seatsTaken
            }
          ]
        });

        this.setState(state => {
          const sourceColumn = state.columns[source.droppableId];
          const newSourceReservationIds = Array.from(
            sourceColumn.reservationIds
          );
          newSourceReservationIds.splice(source.index, 1);
          return {
            draggableId: undefined,
            draggedReservation: undefined,
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
        });
      }
    }
  };

  handleToggleReservationDetails = reservationDetailsId => {
    const { toggleReservationDetails, toggleTableDetails } = this.props;
    this.setState({ reservationDetailsId, tableDetailsId: undefined });
    toggleReservationDetails(!!reservationDetailsId);
    toggleTableDetails(false);
  };

  handleToggleTableDetails = tableDetailsId => {
    const { toggleTableDetails, toggleReservationDetails } = this.props;
    this.setState({ tableDetailsId, reservationDetailsId: undefined });
    toggleTableDetails(!!tableDetailsId);
    toggleReservationDetails(false);
  };

  setRejectModalVisibility = reservationId => {
    this.handleToggleReservationDetails(undefined);
    this.setState({ pendingRejectionReservationId: reservationId });
  };

  removeReservation = () => {
    const { removeReservation } = this.props;
    const { pendingRejectionReservationId } = this.state;
    removeReservation(pendingRejectionReservationId);
    this.setState({ pendingRejectionReservationId: undefined });
  };

  chooseDate = choosenDate => {
    const sevenDaysBeforeToday = moment({ h: 0, m: 0, s: 0, ms: 0 }).subtract(
      7,
      "d"
    );
    if (choosenDate.isBefore(sevenDaysBeforeToday)) {
      error({ message: "notifications:pastDateError" });
      this.setState({
        choosenDate: sevenDaysBeforeToday
      });
    } else {
      this.setState({ choosenDate });
    }
  };

  chooseSlot = choosenSlot => this.setState({ choosenSlot });

  closeMultipleTablesModal = () =>
    this.setState(state => ({
      isMultipleTablesModalVisible: false,
      draggableId: undefined,
      destination: undefined,
      source: undefined,
      draggedReservation: undefined,
      choosenSlot:
        state.choosenSlot !== undefined
          ? state.choosenSlot
          : getSlotClosestToPresent(state.slots)
    }));

  handleForcedReservation = () => {
    const { reservations, updateReservation } = this.props;
    const {
      draggableId: reservationId,
      destination: { droppableId }
    } = this.state;
    const partySize = reservations.getIn([
      reservationId,
      "attributes",
      "partySize"
    ]);
    updateReservation(reservationId, {
      tables: [
        {
          id: droppableId,
          seatsTaken: partySize
        }
      ]
    });
    this.setState(state => {
      const {
        columns,
        source,
        destination,
        draggableId,
        choosenSlot,
        slots
      } = state;
      const sourceColumn = columns[source.droppableId];
      const newSourceReservationIds = Array.from(sourceColumn.reservationIds);
      newSourceReservationIds.splice(source.index, 1);
      const destinationColumn = columns[destination.droppableId];
      const newDestinationReservationIds = Array.from(
        destinationColumn.reservationIds
      );
      newDestinationReservationIds.splice(destination.index, 0, draggableId);
      return {
        isMultipleTablesModalVisible: false,
        draggableId: undefined,
        draggedReservation: undefined,
        destination: undefined,
        source: undefined,
        choosenSlot:
          choosenSlot !== undefined
            ? choosenSlot
            : getSlotClosestToPresent(slots),
        columns: {
          ...columns,
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

  handleReservationSplit = ({ tickets }) => {
    this.setState(state => ({
      splitedReservation: {
        id: state.draggableId,
        tickets,
        tables: []
      },
      isMultipleTablesModalVisible: false,
      draggableId: undefined,
      destination: undefined,
      source: undefined,
      draggedReservation: undefined,
      choosenSlot:
        state.choosenSlot !== undefined
          ? state.choosenSlot
          : getSlotClosestToPresent(state.slots)
    }));
  };

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
      changeCurrentBusiness,
      setEditedReservation
    } = this.props;

    const {
      columns,
      choosenDate,
      slots,
      choosenSlot,
      reservationDetailsId,
      tableDetailsId,
      pendingRejectionReservationId,
      draggedReservation,
      isMultipleTablesModalVisible,
      draggableId,
      splitedReservation
    } = this.state;

    const reservationDetails =
      reservationDetailsId && reservations
        ? reservations.get(reservationDetailsId.split("@")[0])
        : null;

    const reservationTables =
      reservationDetails && tables
        ? getReservationTables(reservationDetails, tables)
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
          tables,
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
            splitedReservation,
            draggedReservation,
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
              t,
              lng,
              reservationDetails,
              splitedReservation,
              reservationTables,
              setEditedReservation,
              handleTableClick: this.handleToggleTableDetails,
              setRejectModalVisibility: this.setRejectModalVisibility
            }}
          />
        </div>
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          <TableDetails
            {...{
              tableDetails,
              tableReservations,
              t,
              handleReservationClick: this.handleToggleReservationDetails
            }}
          />
        </div>
        <RejectReservationModal
          {...{
            isOpen: !!pendingRejectionReservationId,
            onClose: () => this.setRejectModalVisibility(undefined),
            pendingRejectionOrder: reservations
              ? reservations.find(
                  o => o.get("id") === pendingRejectionReservationId
                )
              : null,
            removeReservation: this.removeReservation,
            t
          }}
        />
        <MultipleTablesModal
          {...{
            isOpen: !!isMultipleTablesModalVisible,
            onClose: this.closeMultipleTablesModal,
            onContinue: this.handleForcedReservation,
            onSplit: this.handleReservationSplit,
            partySize: reservations
              ? reservations.getIn([draggableId, "attributes", "partySize"])
              : 0,
            t
          }}
        />
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
  updateBusiness: func.isRequired,
  removeReservation: func.isRequired,
  setEditedReservation: func.isRequired,
  updateReservation: func.isRequired
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
        updateBusiness: patchBusiness,
        removeReservation: deleteReservation,
        updateReservation: patchReservation,
        setEditedReservation: setReservationForEditing
      }
    )(ReservationsPage)
  )
);
