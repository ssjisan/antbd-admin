import { useEffect, useState } from "react";
import api from "../axios";
import { useLoginData } from "./useLoginData";

export default function usePageData() {
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const [pageSuccess, setPageSuccess] = useState("");
  const [pages, setPages] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const { user } = useLoginData();
  // Create Page
  const createPage = async (
    name,
    slug,
    description,
    availableActions = [],
    order,
    group = null,
    iconName,
  ) => {
    setPageLoading(true);
    setPageError("");
    setPageSuccess("");

    try {
      let normalizedSlug = slug || name;
      normalizedSlug = normalizedSlug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9/-]/g, "");
      if (!normalizedSlug.startsWith("/"))
        normalizedSlug = `/${normalizedSlug}`;

      const response = await api.post("/create-page", {
        name,
        slug: normalizedSlug,
        description,
        availableActions,
        order,
        group,
        iconName, // 🔹 include iconName
      });

      if (response.data.success) {
        setPageSuccess("Page created successfully");
        fetchPages();
        return { success: true };
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.suggestedOrder) {
        setPageError(
          `${data.message}. Suggested order: ${data.suggestedOrder}`,
        );
        return { success: false, suggestedOrder: data.suggestedOrder };
      }
      setPageError(data?.message || "Error creating page");
      return { success: false };
    } finally {
      setPageLoading(false);
    }
  };
  // Fetch all pages
  const fetchPages = async () => {
    setPagesLoading(true);
    try {
      const res = await api.get("/pages-list");
      if (res.data.success) setPages(res.data.pages);
    } catch (err) {
      console.error("Error fetching pages:", err);
    }
    setPagesLoading(false);
  };

  // ✅ Fetch single page by ID
  const fetchPageById = async (id) => {
    try {
      const res = await api.get(`/page/${id}`);
      if (res.data.success) return res.data.page;
    } catch (err) {
      console.error("Error fetching page:", err);
      return null;
    }
  };

  // ✅ Update page by ID
  const updatePage = async (
    id,
    name,
    slug,
    description,
    availableActions = [],
    order,
    group = null,
    iconName,
  ) => {
    setPageLoading(true);
    setPageError("");
    setPageSuccess("");

    try {
      let normalizedSlug = slug || name;
      normalizedSlug = normalizedSlug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9/-]/g, "");
      if (!normalizedSlug.startsWith("/"))
        normalizedSlug = `/${normalizedSlug}`;

      const res = await api.put(`/edit-page/${id}`, {
        name,
        slug: normalizedSlug,
        description,
        availableActions,
        order,
        group,
        iconName, // 🔹 include iconName
      });

      if (res.data.success) {
        setPageSuccess("Page updated successfully");
        fetchPages();
        return { success: true };
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.suggestedOrder) {
        setPageError(
          `${data.message}. Suggested order: ${data.suggestedOrder}`,
        );
        return { success: false, suggestedOrder: data.suggestedOrder };
      }
      setPageError(data?.message || "Error updating page");
      return { success: false };
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPages();
    } else {
      setPages([]);
    }
  }, [user]);

  // ✅ Delete page by ID
  const deletePage = async (id) => {
    setPageLoading(true);
    setPageError("");
    setPageSuccess("");

    try {
      const res = await api.delete(`/delete-page/${id}`);
      if (res.data.success) {
        setPageSuccess("Page deleted successfully");
        fetchPages();
        return { success: true };
      }
    } catch (err) {
      const data = err.response?.data;
      setPageError(data?.message || "Error deleting page");
      return { success: false };
    } finally {
      setPageLoading(false);
    }
  };

  return {
    pageLoading,
    pageError,
    pageSuccess,
    createPage,
    updatePage,
    fetchPages,
    fetchPageById,
    setPageError,
    setPageSuccess,
    pages,
    pagesLoading,
    deletePage,
  };
}
