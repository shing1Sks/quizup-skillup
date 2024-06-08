import axios from "axios";
export const getRank = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/user/leaderboard`,
      {
        withCredentials: true,
        params: { rank: 5 },
      }
    );
    return {
      leaderboard: response.data.data.users,
      rank: response.data.data.specificUser,
      rankS: response.data.data.rank
    };
  } catch (error) {
    console.log(error);
  }
};
