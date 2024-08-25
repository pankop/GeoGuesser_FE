"use client";

import { useState, ChangeEvent } from "react";
import Notification from "./Notification";

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) {
      setNotification({ message: "No image selected", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(`https://c241-ps372.et.r.appspot.com/predict`, {
      method: "POST",
      body: JSON.stringify({ file: formData.get("file") }),
    });

    if (response.ok) {
      setNotification({
        message: "Image uploaded successfully",
        type: "success",
      });
      console.log(response);
    } else {
      setNotification({ message: "Failed to upload image", type: "error" });
      console.log(response);
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Your Image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-4 max-w-full h-auto rounded-lg shadow-md"
          />
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
