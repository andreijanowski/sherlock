import { normalizePrice } from "utils/normalizers";

export const getInitialValues = ({ editedDishId, dishes }) => {
  if (editedDishId && dishes) {
    const dish = dishes.get(editedDishId);

    if (dish) {
      const pictures = dish.getIn(["relationships", "pictures", "data"]);
      const picture = pictures && pictures.first();
      return {
        initialValues: {
          name: dish.getIn(["attributes", "name"]),
          pricePerItemCents: normalizePrice(
            dish.getIn(["attributes", "pricePerItemCents"])
          ),
          description: dish.getIn(["attributes", "description"]),
          category: dish.getIn(["attributes", "category"]),
          available: !dish.getIn(["attributes", "unavailable"])
        },
        initialPicture: picture && {
          id: picture.get("id"),
          url:
            picture.getIn(["attributes", "photo", "tablet", "url"]) ||
            picture.getIn(["attributes", "photo", "url"])
        }
      };
    }
  }
  return {
    initialValues: {
      category: "mains"
    }
  };
};

export const categories = [
  "mains",
  "desserts",
  "softs",
  "formulas",
  "starters",
  "sides",
  "pastries",
  "coffee",
  "beer",
  "wine",
  "cocktails",
  "catering",
  "antipasti",
  "breakfast",
  "bubbleTea",
  "burritos",
  "burgers",
  "cold_drinks",
  "fruits",
  "hot_drinks",
  "eiscreme",
  "juices_smoothies",
  "kebab",
  "mezze",
  "milkshakes",
  "pizza",
  "pasta",
  "poke_bowls",
  "ramens",
  "sushis",
  "sauces",
  "snacks",
  "soups",
  "salads",
  "specials",
  "tacos",
  "red_wines",
  "white_wines",
  "rose_wines",
  "sandwiches",
  "other"
];
