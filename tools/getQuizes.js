import axios from "axios";

let lastCallTime = 0;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getQuizes = async (id, diff = "") => {
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;
  const waitTime = 5000 - timeSinceLastCall;

  if (waitTime > 0) {
    console.log(`Waiting for ${waitTime}ms before making the next API call...`);
    await delay(waitTime);
  }

  try {
    lastCallTime = Date.now();
    var response;
    if (!diff) {
      response = await axios.get(
        `https://opentdb.com/api.php?amount=30&category=${id}&type=multiple`
      );
    } else {
      response = await axios.get(
        `https://opentdb.com/api.php?amount=30&category=${id}&difficulty=${diff}&type=multiple`
      );
    }
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
};
