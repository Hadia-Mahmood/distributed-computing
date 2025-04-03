// services/recyclingService.js

import axios from "axios";
import apiUrl from "../utils/baseURL";
import Cookies from "js-cookie";

const token = typeof window !== "undefined" && Cookies.get("jwt");

class UserService {


async getAllRecyclingPoints() {
    const { data } = await axios.get(
      `${apiUrl}/recycling/get-all-recycling-points`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }


  async getAllLandfillPoints() {
    const { data } = await axios.get(
      `${apiUrl}/landfill/get-all-landfill-points`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }
}
export default new UserService();