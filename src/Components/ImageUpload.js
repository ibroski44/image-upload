import React, { useState, useEffect } from "react";
import axios from "axios";

export const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  // Handle file selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);

      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Base64 preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);

    reader.onloadend = async () => {
      const base64Image = reader.result; // Convert image to Base64

      const newImage = {
        id: Date.now(),
        imageUrl: base64Image, // Store base64 data in JSON Server
      };

      try {
        await axios.post("http://localhost:5000/images", newImage);
        setUploadedImages([...uploadedImages, newImage]);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image", error);
      }
    };
  };

  // Fetch existing images
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/images");
      setUploadedImages(response.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  // Fetch images when component mounts
  React.useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" width="200" />}
      <button onClick={handleUpload}>Upload Image</button>

      {/*<div>
        {uploadedImages.map((img) => (
          <img key={img.id} src={img.imageUrl} alt="Uploaded" width="150" />
        ))}
      </div>*/}
    </div>
  );
};
{
  /*
onSuccess: (data) => {
    queryClient.setQueryData("users", (oldQueryData) => {
      if (!oldQueryData) return { data: [data.data] };
      return {
        ...oldQueryData,
        data: [data.data, ...oldQueryData.data], // Add new user to the top
      };
    });
    onUserAdded();
  },   
  */
}
