const parsePictures = pictures =>
  pictures
    .map(p => ({
      id: p.get("id"),
      url:
        p.getIn(["attributes", "photo", "tablet", "url"]) ||
        p.getIn(["attributes", "photo", "url"])
    }))
    .toList()
    .toArray();

const parseProducts = products =>
  products
    .map(p => ({
      id: p.get("id"),
      url: p.getIn(["attributes", "photo", "url"]),
      name: p.getIn(["attributes", "name"])
    }))
    .toList()
    .toArray();

const parseMenus = menus =>
  menus
    .map(m => ({
      id: m.get("id"),
      url: m.getIn(["attributes", "file", "url"]),
      displayName: m.getIn(["attributes", "displayName"])
    }))
    .toList()
    .toArray();

export const getInitialValues = ({
  business,
  businessMenus,
  businessPictures,
  businessProducts
}) => {
  if (business) {
    return {
      logo: business.getIn(["logo", "url"]),
      pictures: parsePictures(businessPictures),
      products: parseProducts(businessProducts),
      menus: parseMenus(businessMenus)
    };
  }
  return undefined;
};
