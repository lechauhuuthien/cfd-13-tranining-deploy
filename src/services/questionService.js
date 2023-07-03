import axiosInstance from "../utils/axiosInstance";

export const questionService = {
  getQuestions(query = '') {
    return axiosInstance.get(`/questions${query}`);
  }
};
