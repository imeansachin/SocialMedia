import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image.");
      return;
    }

    if (!caption.trim()) {
      setError("Please write a caption.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("image", image);
      formData.append("caption", caption);

      axios.post(
  `${import.meta.env.VITE_API_URL}/create-post`,
  formData
)

      navigate("/Feed");

    } catch (err) {
      console.error(err);
      setError("Unable to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

          <button
            onClick={() => navigate("/Feed")}
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            ← Back to Feed
          </button>

          <h1 className="text-lg font-bold text-gray-900">
            Create Post
          </h1>

          <div className="w-20" />

        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-4 py-8">

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-5">

            <h2 className="text-2xl font-bold text-gray-900">
              Share something
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload an image and tell the community about it.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Image upload */}
            <div className="p-6">

              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-16 transition hover:border-blue-400 hover:bg-blue-50"
                >

                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl transition group-hover:scale-110">
                    📷
                  </div>

                  <h3 className="font-semibold text-gray-900">
                    Add a photo
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Click to choose an image
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    PNG, JPG, JPEG • Max 5MB
                  </p>

                </button>
              ) : (
                <div className="relative overflow-hidden rounded-2xl bg-gray-100">

                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[600px] w-full object-contain"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-lg text-white backdrop-blur transition hover:bg-black"
                  >
                    ×
                  </button>

                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </div>

            {/* Caption */}
            <div className="px-6 pb-6">

              <div className="flex items-center justify-between">
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Caption
                </label>

                <span className="text-xs text-gray-400">
                  {caption.length}/250
                </span>
              </div>

              <textarea
                value={caption}
                onChange={(e) => {
                  if (e.target.value.length <= 250) {
                    setCaption(e.target.value);
                  }
                }}
                placeholder="What's on your mind?"
                rows="4"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="mx-6 mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                ⚠️ {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-6 py-5">

              <button
                type="button"
                onClick={() => navigate("/Feed")}
                className="flex-1 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};

export default CreatePost;