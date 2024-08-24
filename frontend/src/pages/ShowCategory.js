import React, { useState } from 'react';
import axios from 'axios';
import Card from '../pages/Card';
import Layout from '../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { deleteDataById, fetchCategory } from '../api/api';

function ShowCategory({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [imagesData, setImagesData] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post(fetchCategory, {
        category: selectedCategory,
      });
      setImagesData(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Error fetching images'); 
    } finally {
      setLoading(false); 
    }
  };

  const handleSave = (updatedImage) => {
    setImagesData((prevImages) =>
      prevImages.map((image) =>
        image.id === updatedImage.id ? { ...image, ...updatedImage } : image
      )
    );
    toast.success('Image updated successfully'); 
  };

  const handleDelete = (imageId) => {
    setImageToDelete(imageId);
    setShowConfirmDelete(true); 
  };

  const confirmDelete = async () => {
    setLoading(true); 
    try {
      await axios.post(deleteDataById, { id: imageToDelete });
      setImagesData((prevImages) => prevImages.filter((image) => image.id !== imageToDelete));
      toast.success('Image deleted successfully'); 
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image'); 
    } finally {
      setLoading(false); 
      setShowConfirmDelete(false); 
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false); 
  };

  return (
    <Layout>
            <ToastContainer />

      <div className="w-[300px] lg:w-[400px] mx-auto mt-10 p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="text-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Category
          </label>
          <div className="dropdown mb-6">
            <div
              className="dropdown-toggle p-3 bg-white border border-gray-200 rounded-lg cursor-pointer"
              onClick={handleDropdownToggle}
            >
              {selectedCategory}
            </div>
            {isOpen && (
              <div className="dropdown-menu mt-2 p-3 bg-white border border-gray-200 rounded-lg">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="p-button p-component p-button-primary p-3 bg-blue-500 text-white shadow-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex flex-cols-2 gap-2 justify-center mt-6">
        {loading ? (
          <div className="flex items-center justify-center w-full h-64">
            <div className="loader">Loading...</div> 
          </div>
        ) : (
          imagesData.map((image) => (
            <Card
              key={image.id}
              image={image}
              categories={categories}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this image?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}

export default ShowCategory;
