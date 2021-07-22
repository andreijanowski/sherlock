export default (prevPath, lng) => {
  const regex = new RegExp(`^/\\w\\w/`, "gm");
  return prevPath.replace(regex, `/${lng}/`);
};
