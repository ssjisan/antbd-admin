import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NewsContentRenderer from "../lib/html2text";
import { Box, Button, Typography } from "@mui/material";

export default function NewsPreviewPart() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/news/${id}`);
        setNews(res.data);
      } catch (error) {
        toast.error("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNews();
  }, [id]);
  console.log(news);

  if (loading) return <Box>Loading...</Box>;

  if (!news) return <Box>No Data Found</Box>;

  return (
    <Box style={{ maxWidth: "900px", margin: "40px auto" }}>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <img src={news.coverPhoto} />
      <Typography variant="h3" sx={{ mb: "24px" }}>
        {news.title}
      </Typography>

      <NewsContentRenderer html={news.contentHTML} />
    </Box>
  );
}
