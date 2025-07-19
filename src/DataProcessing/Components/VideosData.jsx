import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VideosData() {
  const [videos, setVideos] = useState([]);

 // Load Videos Start //
 useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

    if (parsedAuth?.token) {
      axios.defaults.baseURL = process.env.REACT_APP_SERVER_API;
      axios.defaults.headers.common["Authorization"] = parsedAuth.token;
      loadVideos();
    }
  }, []);

  const loadVideos = async () => {
    try {
      const { data } = await axios.get("/list_videos");
      setVideos(data);
    } catch (err) {
      toast.error("Problem loading videos", err.message);
    }
  };
  return {
    videos,
    setVideos,
  };
}
