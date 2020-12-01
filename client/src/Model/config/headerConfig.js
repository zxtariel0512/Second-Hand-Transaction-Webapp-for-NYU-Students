import { Auth } from "aws-amplify";
/**
 * Config and Create Header for Authenticated API
 */

const createHeader = async () => {
  const user = await Auth.currentSession();
  const token = user.getIdToken().jwtToken;
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export default createHeader;
