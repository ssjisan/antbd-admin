import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function AllNewsList() {
  const [allNews, setAllNews] = useState([]);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("/all-news");
        setAllNews(res.data || []);
      } catch {
        toast.error("Failed to load clients");
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/delete-news/${id}`);
      toast.success("Article deleted successfully");

      // 🔥 remove from UI instantly
      setAllNews((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  return (
    <div>
      <div>
        <div>
          {allNews.map((data) => (
            <div key={data._id}>
              <div>{data.title}</div>{" "}
              <Link to={`/news-preview/${data._id}`}>preview</Link>{" "}
              <Link to={`/news-editor/${data._id}`}>edit</Link>{" "}
              <button onClick={() => handleDelete(data._id)}>delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
