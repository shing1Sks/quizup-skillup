import React from "react";
import axios from "axios";

function Logout({ setLogout }) {
  const handleLogout = async () => {
    setLogout(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/user/logout`,
        {
          withCredentials: true,
        }
      );
      // console.log(response)
      setLogout(false);
      location.reload();
    } catch (error) {
      console.log(error);
      setLogout(false);
      location.reload();
    }
  };
  return (
    <div>
      <button
        className="border-2 border-gray-300 rounded-md px-2 hover:border-gray-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
