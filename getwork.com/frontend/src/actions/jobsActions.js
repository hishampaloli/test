import { axiosJobsInstance } from "../contants/axios";
import {
    ALL_JOBS_FAIL,
    ALL_JOBS_REQUEST,
  ALL_JOBS_SUCCES,
  JOBS_DETAILS_FAIL,
  JOBS_DETAILS_REQUEST,
  JOBS_DETAILS_SUCCES,
  JOBS_POST_FAIL,
  JOBS_POST_REQUEST,
  JOBS_POST_SUCCES,
  MYJOBS_FAIL,
  MYJOBS_REQUEST,
  MYJOBS_SUCCES,
  SAVE_JOBS_FAIL,
  SAVE_JOBS_REQUEST,
  SAVE_JOBS_SUCCES,
} from "../contants/jobsContants.js";

export const myJobs =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: MYJOBS_REQUEST,
      });

      console.log(keyword);

      const tokenId = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId.token}`,
        },
      };


      const { data } = await axiosJobsInstance.get(
        `/mypost/${tokenId._id}?keyword=${keyword}`,
        config
      );

      console.log(data);

      dispatch({
        type: MYJOBS_SUCCES,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MYJOBS_FAIL,
        error: error,
      });
    }
  };

export const postJobs =
  (title, description, budget, deadline, level, searchTag) =>
  async (dispatch) => {
    try {
      dispatch({
        type: JOBS_POST_REQUEST,
      });
      console.log(title);
      console.log(description);
      console.log(budget);
      console.log(deadline);
      console.log(searchTag);
      console.log(level);

      const tokenId = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId.token}`,
        },
      };

      const { data } = await axiosJobsInstance.post(
        `/postJob/${tokenId._id}`,
        {
          title,
          description,
          budget,
          deadline,
          level,
          searchTag,
        },
        config
      );

      dispatch({
        type: JOBS_POST_SUCCES,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOBS_POST_FAIL,
        error: error,
      });
    }
  };

export const getAllJobs = (keyword='') => async (dispatch) => {
  try {
    dispatch({
      type: ALL_JOBS_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosJobsInstance.get(`/getAllJobs?keyword=${keyword}`, config);

    dispatch({
      type: ALL_JOBS_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_JOBS_FAIL,
      error: error,
    });
  }
};

export const JobsDetails = (id) => async (dispatch) => {
  console.log(32453535);
  try {
    dispatch({
      type: JOBS_DETAILS_REQUEST,
    });

    const tokenId = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenId.token}`,
      },
    };

    const { data } = await axiosJobsInstance.get(`/jobs/${id}`, config);

    dispatch({
      type: JOBS_DETAILS_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOBS_DETAILS_FAIL,
      error: error,
    });
  }
};

