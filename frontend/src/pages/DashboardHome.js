import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageUpload } from '../api/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import  Layout  from '../components/Layout';

function DashboardHome({ categories}) { 
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Popular');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  console.log(categories,"=====")

  const navigate = useNavigate();
  const username = Cookies.get('username');
  
  const checkuser = () => {
    if (!username || username === null || username === undefined) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkuser();
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('category', category);
    console.log('FormData:', formData.get('category')); 

    console.log('FormData:', {
        image: file,
        name,
        category
      });
    try {
      const response = await axios.post(ImageUpload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setImageUrl(response.data.imageUrl);
      toast.success('Uploaded successfully');
    } catch (error) {
      setMessage('Error uploading image');
      toast.error('Error uploading image');
    } finally {
      setLoading(false);
    }
    setName('')
    setCategory('')
  };

  return (
    <Layout>
      <ToastContainer />

      <div className="w-[400px] mx-auto mt-10 p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={onFileChange}
              className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Enter Image Title"
              className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select onChange={onCategoryChange} value={category}
             className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
            {categories.map((category, index) => (
           <option key={index} value={category} className='lg:mt-8'>
            {category}
           </option>
           ))}
          </select>

          </div>
        <div className='flex justify-center items-center'>
        <button
            type="submit"
            className="w-[180px] bg-indigo-600 text-white py-2 px-4 rounded-lg focus:ring-4 focus:ring-indigo-300"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        
        </form>
        {message && (
          <div className="mt-4 text-sm flex justify-center items-center">
            <p className='text-green-600'>{message}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default DashboardHome;
