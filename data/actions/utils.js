/* eslint-disable import/prefer-default-export */
export const getRelationships = (parent, id) => ({
  [parent]: {
    data: {
      type: parent,
      id
    }
  }
});
