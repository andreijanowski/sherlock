import { Service, Badge } from "./styled";

const List = ({ t, name, color }) => {
  const listLength = t(`plans.${name}.list.length`);
  const listArray = [];
  for (let i = 0; i < listLength; i += 1) {
    const serviceName = t(`plans.${name}.list.${i}`);
    if (i === 4 || i === 5) {
      listArray.push(
        <Service key={serviceName}>
          <Badge color={color}>{t(`plans.${name}.badge`)}</Badge>
          {serviceName}
        </Service>
      );
    } else {
      listArray.push(<Service key={serviceName}>{serviceName}</Service>);
    }
  }
  return listArray;
};

export default List;
