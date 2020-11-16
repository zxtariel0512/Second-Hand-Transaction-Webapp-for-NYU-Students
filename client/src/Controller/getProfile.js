import { getProfileModel } from "Model/profileModel";

const getProfile = async (netid) => {
  try {
    const res = await getProfileModel(netid);
    console.log(res);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getProfile;
