export const getRelationships = (parent, id) => ({
  [parent]: {
    data: {
      type: parent,
      id
    }
  }
});

export const getDataRelationships = (parent, data) => ({
  [parent]: {
    data: {
      type: parent,
      data
    }
  }
});
