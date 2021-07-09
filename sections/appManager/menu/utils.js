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
          category: dish.getIn(["relationships", "category", "data", "id"]),
          available: !dish.getIn(["attributes", "unavailable"]),
          onUberEats: dish.getIn(["attributes", "onUberEats"])
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
    initialValues: {}
  };
};

export const prepareCategories = categories =>
  categories.size > 0
    ? categories
        .map(b => ({
          value: b.get("id"),
          label: b.getIn(["attributes", "name"])
        }))
        .sort((opt1, opt2) => opt1.label.localeCompare(opt2.label))
        .toList()
        .toArray()
    : [];