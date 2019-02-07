/* eslint-disable import/prefer-default-export */

const parsePictures = pictures =>
  pictures.map(p => ({ id: p.id, url: p.photo.tablet.url || p.photo.url }));

const parseProducts = products =>
  products.map(p => ({ id: p.id, url: p.photo.url, name: p.name }));

const parseMenus = menus =>
  menus.map(m => ({ id: m.id, url: m.file.url, displayName: m.displayName }));

export const getInitialValues = business => {
  if (business) {
    const { logo, pictures, products, menus } = business;

    return {
      logo,
      pictures: parsePictures(pictures),
      products: parseProducts(products),
      menus: parseMenus(menus)
    };
  }
  return undefined;
};
