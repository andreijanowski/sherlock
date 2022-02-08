import { denormalizeStateData } from "utils/misc";

export const selectDenormalizedDishes = state => {
  const stateDataObj = state.getIn(["dishes", "data"]);
  const dishes = stateDataObj.get("dishes");

  // return undefined to allow null check and avoid .toJS() method call
  if (!dishes) return undefined;

  return denormalizeStateData({
    state: stateDataObj,
    data: dishes
  });
};
