export const selectIsConnectedWithOrkestro = state =>
  state.getIn(["integrations", "isConnectedToOrkestro"]);
