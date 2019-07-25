export const getInitialValues = ({ editedTableId, tables }) => {
  if (editedTableId && tables) {
    const table = tables.get(editedTableId);

    return table
      ? {
          number: table.getIn(["attributes", "number"]),
          numberOfSeats: table.getIn(["attributes", "numberOfSeats"])
        }
      : {};
  }
  return {};
};
