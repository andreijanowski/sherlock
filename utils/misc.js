import { List, Map } from "immutable";

const GRANTED_PERMISSION = "granted";

export const bytesToKB = sizeInBytes =>
  parseFloat((sizeInBytes / 1024).toFixed(2));

export const requestNotificationsPermission = async () => {
  const isNativeNotificationsAvailable = "Notification" in window;
  if (!isNativeNotificationsAvailable) {
    return null;
  }

  return Notification.requestPermission();
};

export const showNativeNotification = async title => {
  const permission = await requestNotificationsPermission();

  if (permission !== GRANTED_PERMISSION) {
    return;
  }

  // we need to use new to trigger notifications
  // eslint-disable-next-line
  new Notification(title);
};

const denormalizeStateDataItem = ({ state, data }) => {
  const relationships = data.get("relationships");

  if (!relationships) return data;

  return data.set(
    "relationships",
    relationships.map(relationshipGroup => {
      const relationshipGroupData = relationshipGroup.get("data");

      if (relationshipGroupData && List.isList(relationshipGroupData)) {
        return relationshipGroup.set(
          "data",
          relationshipGroupData.map(relationship => {
            const { id, type } = relationship.toJS();
            const denormalizedModel = state.getIn([type, id]);
            return denormalizedModel
              ? denormalizeStateDataItem({
                  state,
                  data: denormalizedModel
                })
              : relationship;
          })
        );
      }
      return relationshipGroup;
    })
  );
};

export const denormalizeStateData = ({ state, data }) =>
  Map.isMap(data) || List.isList(data)
    ? data.map(dataItem => denormalizeStateDataItem({ state, data: dataItem }))
    : denormalizeStateDataItem({ state, data });
