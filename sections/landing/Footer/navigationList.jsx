import { func, string } from "prop-types";
import { ListWrapper, NavigationLink } from "./styled";

const navigationList = ({ t, columnName }) => {
  const listLength = t(`footer.navigation.${columnName}.links.length`);
  const linksList = [];
  for (let i = 0; i < listLength; i += 1) {
    const linkName = t(`footer.navigation.${columnName}.links.${i}`);
    linksList.push(
      <li key={linkName}>
        <NavigationLink href="#">{linkName}</NavigationLink>
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
  columnName: string.isRequired
};

export default navigationList;
