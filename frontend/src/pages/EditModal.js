import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { updateData } from '../api/api';

const EditModal = ({ visible, onHide, image, categories, onSave }) => {
  const [editImageName, setEditImageName] = useState(image.name);
  const [editImageCategory, setEditImageCategory] = useState(image.category);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSave = () => {
    setShowConfirmation(true); 
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', image.id);
      formData.append('name', editImageName);
      formData.append('category', editImageCategory);
      if (selectedImage) {
        formData.append('url', selectedImage);
      }

      const response = await axios.post(updateData, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Changes Done successfully:", response.data);
      
      onSave({ id: image.id, name: editImageName, category: editImageCategory, url: selectedImage ? URL.createObjectURL(selectedImage) : image.url });
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error in updating :", error.response ? error.response.data : error.message);
    }
  };

  const handleCancelUpdate = () => {
    setShowConfirmation(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div>
      <Dialog header="Edit Image" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
        <div className="p-fluid">
          <div className="field mb-4">
            <label htmlFor="imageUpload" className="block text-gray-700 font-semibold mb-2">Upload New Image</label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="field mb-4">
            <label htmlFor="imageName" className="block text-gray-700 font-semibold mb-2">Image Name</label>
            <InputText
              id="imageName"
              value={editImageName}
              onChange={(e) => setEditImageName(e.target.value)}
              placeholder="Enter new image name"
              className="p-inputtext p-component border border-gray-300 rounded-lg p-2 shadow-sm w-full"
            />
          </div>
          <div className="field mb-4">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
            <Dropdown
              id="category"
              value={editImageCategory}
              options={categories}
              onChange={(e) => setEditImageCategory(e.value)}
              placeholder="Select a category"
              className="p-dropdown w-full border border-gray-300"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              label="Save"
              onClick={handleSave}
              className="p-button p-button-success p-2 bg-green-500 text-white shadow-md hover:bg-green-600"
            />
            <Button
              label="Cancel"
              onClick={onHide}
              className="p-button p-button-secondary p-2 bg-red-500 text-white shadow-md hover:bg-red-600"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Confirm Update"
        visible={showConfirmation}
        modal
        onHide={handleCancelUpdate}
      >
        <p>Do you want to update the image details?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            label="Update"
            onClick={handleUpdate}
            className="p-button p-button-success p-2 bg-green-500 text-white shadow-md hover:bg-green-600"
          />
          <Button
            label="Cancel"
            onClick={handleCancelUpdate}
            className="p-button p-button-secondary p-2 bg-red-500 text-white shadow-md hover:bg-red-600"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default EditModal;
