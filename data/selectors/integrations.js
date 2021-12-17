export const selectIsConnectedWithOrkestro = state =>
  state.getIn(["integrations", "isConnectedToOrkestro"]);

export const selectPreviousConfig = state =>
  state.getIn(["partners", "previousConfig"]);
