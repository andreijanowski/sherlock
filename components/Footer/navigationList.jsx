import { func, string, shape } from "prop-types";
import { ListWrapper, NavigationLink } from "./styled";

const navigationList = ({ t, columnName, hrefs }) => {
  const listLength = t(`navigation.${columnName}.links.length`);
  const linksList = [];
  for (let i = 0; i < listLength; i += 1) {
    const linkName = t(`navigation.${columnName}.links.${i}`);
    linksList.push(
      <li key={linkName}>
        <NavigationLink href={hrefs ? hrefs[i] : "#"}>
          {linkName}
        </NavigationLink>
      </li>
    );
  }
  return (
    <nav>
      <ListWrapper>{linksList}</ListWrapper>
    </nav>
  );
};

navigationList.propTypes = {
  t: func.isRequired,
  columnName: string.isRequired,
  hrefs: shape()
};

navigationList.defaultProps = {
  hrefs: null
};

export default navigationList;
