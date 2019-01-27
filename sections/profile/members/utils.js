/* eslint-disable import/prefer-default-export */
export const generateMembersArray = m => {
  const members = m || [];
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
