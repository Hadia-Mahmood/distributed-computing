
import axios from "axios";
import apiUrl from "../utils/baseURL";
import Cookies from "js-cookie";

const token = typeof window !== "undefined" && Cookies.get("jwt");

class DistrictAdminService {


  async getMonthlyWastePercentages(district) {
    const { data } = await axios.get(
      `${apiUrl}/getMonthlyWastePercentages/${district}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }

  async getWasteCollectionBySubdivision(districtAdmin) {
    const { data } = await axios.get(
      `${apiUrl}/getWasteCollectionBySubdivision/${districtAdmin}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }
  
  async getMonthlyComplaintsSummary(district) {
    const { data } = await axios.get(
      `${apiUrl}/complaint/getMonthlyComplaintsSummary/${district}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }

  async getTotalWasteLast7Days(district) {
    const { data } = await axios.get(
      `${apiUrl}/getTotalWasteLast7Days/${district}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }


  async getWasteRecycledByDistrict(district) {
    const { data } = await axios.get(
      `${apiUrl}/getWasteRecycledByDistrict/${district}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }

  async getTotalWasteReceived(district) {
    const { data } = await axios.get(
      `${apiUrl}/getTotalWasteReceived/${district}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }

  async getComplaintsSummary(district) {
    const { data } = await axios.get(
      `${apiUrl}/complaint/getComplaintsSummary/${district}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }

  async getTopViewedThreads() {
    const { data } = await axios.get(
      `${apiUrl}/thread/get-top-threads`,
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

export default new DistrictAdminService();







