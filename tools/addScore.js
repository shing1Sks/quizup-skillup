import axios from "axios";
export const addScore = async (score) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/add-score`,
      {
        score: score,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
};
