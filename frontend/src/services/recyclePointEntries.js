import axios from "axios";
import apiUrl from "../utils/baseURL";
import Cookies from "js-cookie";

const token = typeof window !== "undefined" && Cookies.get("jwt");

class RecyclingEntry {
  async inputEntry(data) {

    const res = await axios.post(
      `${apiUrl}/recycling/create-input-entry`,
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

  async addResponseToRecyclingPoint(id, data) {
    try {
      console.log("IDDDDDDDDDDDDD");
      console.log(id);
      console.log(data);
      const response = await axios.put(
        `${apiUrl}/recycling/update/${id}`,
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

  async deleteRecyclingPointById(id) {
    try {
      console.log("service")
      const response = await axios.delete(
        `${apiUrl}/recycling/delete-recycling-point/${id}`,
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
        "Something went wrong while deleting the Recycling Point."
      );
    }
  }



  async getAllRecyclingPoints() {
    try {
      const {data} = await axios.get(`${apiUrl}/recycling/get-all-recycling-points`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  async newRecyclingPoint(data) {

    const res = await axios.post(
      `${apiUrl}/recycling/create-recycling-point`,
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

  async getAllInputEntries() {
    try {
      console.log("Entry Service")
      const {data} = await axios.get(`${apiUrl}/recycling/get-input-entries`, {
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

  async getAllOutputEntries() {
    try {
      console.log("Entry Service")
      const {data} = await axios.get(`${apiUrl}/recycling/get-output-entries`, {
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

  async getSpecificRecyclingIEntries(landfillId) {
    try {
      console.log("Entry Service1 ")
      const {data} = await axios.get(`${apiUrl}/recycling/getRecyclingEntriesByAdmin/${landfillId}`, {
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

  async getSpecificRecyclingOEntries(landfillId) {
    try {
      console.log("Entry Service  2 ")
      const {data} = await axios.get(`${apiUrl}/recycling/getRecyclingOutputEntriesByAdmin/${landfillId}`, {
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

  async UpdateUrl(data) {
    console.log("in serv")
    console.log(data)
    const res = await axios.post(
      `${apiUrl}/recycling/updateRecyclingLatestUrl`,
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


  async UpdateUrlO(data) {
    console.log("in serv")
    console.log(data)
    const res = await axios.post(
      `${apiUrl}/recycling/updateRecyclingLatestUrlO`,
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

  async outputEntry(data) {

    const res = await axios.post(
      `${apiUrl}/recycling/create-output-entry`,
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
export default new RecyclingEntry();
