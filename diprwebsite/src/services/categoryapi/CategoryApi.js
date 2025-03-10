import axios from "../../config/axios";

export const CategoryApi = async () => {
  try {
    const response = await axios.get("/api/category");
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

export const NewsApi = async (categoryId = null) => {
  try {
    const endpoint = categoryId ? `/api/news/categories/${categoryId}` : "/api/news";
    const response = await axios.get(endpoint);
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

// video api 

export const VideoApi = async (videoId = null) => {
  try {
    const endpoint = videoId ? `/api/video/${videoId}` : "/api/video";
    const response = await axios.get(endpoint);
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};


// banner api 

export const BannerApi = async () => {
  try {
    const response = await axios.get("/api/banner/");
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

// comment api

export const addComment = async (commentData) => {
  try {
    const response = await axios.post("/api/news/addComment", commentData);
    return response.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    throw err;
  }
};

export const likeComment = async (commentId) => {
  try {
    const response = await axios.post("/api/comments/like", { commentId });
    return response.data;
  } catch (err) {
    console.error("Error liking comment:", err);
    throw err;
  }
};