export const generateMembersArray = m => {
  const members = m
    ? m
        .map(i => ({
          email: i.getIn(["attributes", "email"]),
          role: i.getIn(["attributes", "role"]),
          businessManager: i.getIn(["attributes", "businessManager"]),
          id: i.get("id")
        }))
        .toList()
        .toArray()
    : [];
  if (members.length < 5) {
    for (let i = members.length; i < 5; i += 1) {
      members.push({
        email: "",
        role: ""
      });
    }
  }
  return members;
};
