import { updateUserModel } from "Model/User/userModel";

const updateUser = async (netid, user, token) => {
  try {
    const res = await updateUserModel(netid, user, token);
    console.log(res);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default updateUser;
