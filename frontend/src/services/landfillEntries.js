import axios from "axios";
import apiUrl from "../utils/baseURL";
import Cookies from "js-cookie";

const token = typeof window !== "undefined" && Cookies.get("jwt");

class LandfillEntry {
  async inputEntry(data) {
    console.log("HelloJee");
    console.log(apiUrl);
    console.log(data);
    const res = await axios.post(
      `${apiUrl}/landfill/create-input-entry`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async addResponseToLandfill(id, data) {
    try {
      console.log("IDDDDDDDDDDDDD");
      console.log(id);
      console.log(data);
      const response = await axios.put(
        `${apiUrl}/landfill/update/${id}`,
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Internal server error");
    }
  }

  async deleteLandfillById(id) {
    try {
      console.log("service")
      const response = await axios.delete(
        `${apiUrl}/landfill/delete-landfill-point/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response.data.message ||
        "Something went wrong while deleting the Landfill."
      );
    }
  }

  async deleteLandfillEntryById(id) {
    try {
      console.log("service")
      const response = await axios.delete(
        `${apiUrl}/landfill/delete-landfill-entry-point/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response.data.message ||
        "Something went wrong while deleting the Landfill."
      );
    }
  }


  async getAllLandfills() {
    try {
      console.log("DAAAAAAAATA333")
      const {data} = await axios.get(`${apiUrl}/landfill/get-all-landfill-points`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("DAAAAAAAATA444")
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  };

  async getAllLandfillEntries() {
    try {
      console.log("Entry Service")
      const {data} = await axios.get(`${apiUrl}/landfill/get-landfill-input-entries`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("DAAAAAAAATA")
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  };

  async getSpecificLandfillEntries(landfillId) {
    try {
      console.log("Entry Service1 ")
      const {data} = await axios.get(`${apiUrl}/landfill/getLandfillEntriesByAdmin/${landfillId}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("DAAAAAAAATA")
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  };

  async NewLandfill(data) {
    console.log("HelloJee");
    console.log(apiUrl);
    console.log(data);
    const res = await axios.post(
      `${apiUrl}/landfill/create-landfill-point`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }


  async UpdateUrl(data) {
    console.log("in serv")
    console.log(data)
    const res = await axios.post(
      `${apiUrl}/landfill/updateLandfillLatestUrl`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new LandfillEntry();
