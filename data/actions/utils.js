export const getRelationships = (parent, id) => ({
  [parent]: {
    data: {
      type: parent,
      id
    }
  }
});
