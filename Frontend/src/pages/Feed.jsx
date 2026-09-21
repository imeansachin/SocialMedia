import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [deletingPost, setDeletingPost] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  // Fetch posts
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => {
        setPosts(res.data.posts || []);
      })
      .catch((err) => {
        console.error("Fetch posts error:", err);
        setError("Unable to load posts.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Delete specific post
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingPost(postId);
      setOpenMenu(null);

      axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`);

      // Remove only the deleted post from UI
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );

    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setDeletingPost(null);
    }
  };

  // Like post
  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Share post
  const handleShare = async (post) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${post._id}`
      );

      alert("Post link copied!");
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-bold tracking-tight text-blue-600"
          >
            Socially<span className="text-gray-900">.</span>
          </div>

          {/* Create Post */}
          <button
            onClick={() => navigate("/create-post")}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            + Create Post
          </button>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-2xl px-4 py-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Feed
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Discover the latest posts from the community.
          </p>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="space-y-6">

            {[1, 2].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="animate-pulse">

                  <div className="flex items-center gap-3 p-4">
                    <div className="h-11 w-11 rounded-full bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-gray-200" />
                      <div className="h-2 w-16 rounded bg-gray-200" />
                    </div>
                  </div>

                  <div className="h-80 bg-gray-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

            <div className="mb-2 text-3xl">
              ⚠️
            </div>

            <h2 className="font-semibold text-red-700">
              Something went wrong
            </h2>

            <p className="mt-1 text-sm text-red-500">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ================= POSTS ================= */}
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-6">

            {posts.map((post) => {

              const isLiked = likedPosts[post._id];
              const isDeleting = deletingPost === post._id;
              const menuOpen = openMenu === post._id;

              return (
                <article
                  key={post._id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >

                  {/* ================= POST HEADER ================= */}
                  <div className="flex items-center justify-between p-4">

                    <div className="flex items-center gap-3">

                      {/* Avatar */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                        S
                      </div>

                      {/* User */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Sachin
                        </h3>

                        <p className="text-xs text-gray-500">
                          Just now
                        </p>
                      </div>

                    </div>

                    {/* ================= MENU ================= */}
                    <div className="relative">

                      <button
                        onClick={() =>
                          setOpenMenu(menuOpen ? null : post._id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                      >
                        ⋯
                      </button>

                      {menuOpen && (
                        <div className="absolute right-0 top-11 z-20 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl">

                          <button
                            onClick={() => handleDelete(post._id)}
                            disabled={isDeleting}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            🗑️
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>

                        </div>
                      )}

                    </div>

                  </div>

                  {/* ================= IMAGE ================= */}
                  <div className="bg-gray-100">

                    <img
                      src={post.image}
                      alt={post.caption || "Post"}
                      className="max-h-[600px] w-full object-cover"
                      loading="lazy"
                    />

                  </div>

                  {/* ================= ACTIONS ================= */}
                  <div className="px-4 pt-4">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-5">

                        {/* LIKE */}
                        <button
                          onClick={() => handleLike(post._id)}
                          className={`flex items-center gap-1.5 text-sm font-medium transition ${
                            isLiked
                              ? "text-red-500"
                              : "text-gray-600 hover:text-red-500"
                          }`}
                        >
                          <span className="text-xl">
                            {isLiked ? "♥" : "♡"}
                          </span>

                          Like
                        </button>

                        {/* COMMENT */}
                        <button
                          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                          <span className="text-xl">
                            ○
                          </span>

                          Comment
                        </button>

                        {/* SHARE */}
                        <button
                          onClick={() => handleShare(post)}
                          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                          <span className="text-lg">
                            ↗
                          </span>

                          Share
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* ================= CAPTION ================= */}
                  <div className="px-4 pb-5 pt-3">

                    <p className="text-[15px] leading-6 text-gray-800">

                      <span className="mr-2 font-semibold">
                        Sachin
                      </span>

                      {post.caption}

                    </p>

                  </div>

                  {/* ================= DELETING OVERLAY ================= */}
                  {isDeleting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                      <div className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-lg">
                        Deleting post...
                      </div>
                    </div>
                  )}

                </article>
              );
            })}

          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && !error && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

            <div className="mb-4 text-5xl">
              📸
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No posts yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              Be the first person to share something with the community.
            </p>

            <button
              onClick={() => navigate("/create-post")}
              className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create your first post
            </button>

          </div>
        )}

      </main>
    </div>
  );
};

export default Feed;