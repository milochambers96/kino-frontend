import axios from "axios";

const kinoCloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryUpload = async (file: File) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${kinoCloud}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.secure_url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to upload image to Cloudinary"
      );
    } else {
      throw new Error("An unexpected error occurred during the upload");
    }
  }
};
