import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/get-user`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching user:", error);
    return false;
  }
};
