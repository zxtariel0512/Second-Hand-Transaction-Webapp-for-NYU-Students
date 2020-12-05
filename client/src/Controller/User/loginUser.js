import { loginUserModel } from "Model/User/userModel";

const loginUser = async (netid) => {
  try {
    const res = await loginUserModel(netid);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default loginUser;
