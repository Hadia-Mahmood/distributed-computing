import axios from "axios";
import apiUrl from "../utils/baseURL";
import Cookies from "js-cookie";

const token = typeof window !== "undefined" && Cookies.get("jwt");

class ThreadEntry {
  async createThread(data) {

    const res = await axios.post(
      `${apiUrl}/thread/create-thread`,
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
  async getAllThreads() {
    try {

      const {data} = await axios.get(`${apiUrl}/thread/get-threads`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("data")
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  };
  async getThread(threadId) {
    try {
      console.log("sadsda")
      console.log(threadId)
      const {data} = await axios.get(`${apiUrl}/thread/get-thread/${threadId}`, {
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
  async likeById2(userData) {
    try {
      //console.log(data);
      const response = await axios.post(`${apiUrl}/thread/like`,
      userData ,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error("Internal server error");
    }
  }
 
  async addReply(threadId, data) {
    try {
      const response = await axios.post(`${apiUrl}/thread/add-reply-to-a-thread/${threadId}`,
      data ,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error("Internal server error");
    }
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
export default new ThreadEntry();
