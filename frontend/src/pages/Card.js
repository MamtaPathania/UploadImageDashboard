import React, { useState } from 'react';
import EditModal from './EditModal';

const Card = ({ image, categories, onSave, onDelete }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFullscreenVisible, setFullscreenVisible] = useState(false);

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleSave = (updatedImage) => {
    onSave(updatedImage);
    setModalVisible(false); 
  };

  const handleImageClick = () => {
    setFullscreenVisible(true);
  };

  const handleFullscreenClose = () => {
    setFullscreenVisible(false);
  };

  return (
    <div className="lg:ml-64 mt-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <img
        src={image.url}
        alt={image.name}
        className="mb-2 rounded-lg lg:w-[400px] lg:h-[200px] w-[300px] h-[200px] cursor-pointer"
        onClick={handleImageClick}
      />
      <h2 className="text-xl font-bold">{image.name}</h2>
      <p className="text-gray-600">Category: {image.category}</p>
      <div className="flex justify-between mt-1">
        <button
          onClick={handleEditClick}
          className="flex items-center justify-center p-button p-component p-button-outlined p-button-secondary bg-green-500 text-white w-[80px] px-3 py-1 text-center"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(image.id)}
          className="flex items-center justify-center p-button p-component p-button-outlined p-button-danger bg-red-500 w-[80px] text-white px-3 py-1 text-center"
        >
          Delete
        </button>
      </div>

      <EditModal
        visible={isModalVisible}
        onHide={() => setModalVisible(false)}
        image={image}
        categories={categories}
        onSave={handleSave}
      />

      {/* Fullscreen Image Modal */}
      {isFullscreenVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative">
            <img
              src={image.url}
              alt={image.name}
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={handleFullscreenClose}
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;

// import React, { useState } from 'react';
// import EditModal from './EditModal';

// const Card = ({ image, categories, onSave, onDelete }) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleEditClick = () => {
//     setModalVisible(true);
//   };

//   const handleSave = (updatedImage) => {
//     onSave(updatedImage);
//     setModalVisible(false); 
//   };

//   return (
//     <div className="lg:ml-64 mt-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
//       <img
//         src={image.url}
//         alt={image.name}
//         className="mb-2 rounded-lg lg:w-[400px] lg:h-[200px] w-[300px] h-[200px]"
//       />
//       <h2 className="text-xl font-bold">{image.name}</h2>
//       <p className="text-gray-600">Category: {image.category}</p>
//       <div className="flex justify-between mt-1">
//   <button
//     onClick={handleEditClick}
//     className="flex items-center justify-center p-button p-component p-button-outlined p-button-secondary bg-green-500 text-white w-[80px] px-3 py-1 text-center"
//   >
//     Edit
//   </button>
//   <button
//     onClick={() => onDelete(image.id)}
//     className="flex items-center justify-center p-button p-component p-button-outlined p-button-danger bg-red-500 w-[80px] text-white px-3 py-1 text-center"
//   >
//     Delete
//   </button>
// </div>

//       <EditModal
//         visible={isModalVisible}
//         onHide={() => setModalVisible(false)}
//         image={image}
//         categories={categories}
//         onSave={handleSave}
//       />
//     </div>
//   );
// };

// export default Card;


// import React, { useState } from 'react';
// import EditModal from './EditModal';

// const Card = ({ image, categories, onSave, onDelete }) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleEditClick = () => {
//     setModalVisible(true);
//   };

//   const handleSave = (updatedImage) => {
//     onSave(updatedImage);
//     setModalVisible(false); // Hide modal after save
//   };

//   return (
//     <div className="lg:ml-64 p-4 border border-gray-300 rounded-lg shadow-lg bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
//       <img
//         src={image.url} 
//         alt={image.name}
//         className="mb-2 rounded-lg w-[500px] h-[200px]"
//       />
//       <h2 className="text-xl font-bold">{image.name}</h2>
//       <p className="text-gray-600">Category: {image.category}</p>
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={handleEditClick}
//           className="p-button p-component p-button-outlined p-button-secondary"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(image.id)}
//           className="p-button p-component p-button-outlined p-button-danger"
//         >
//           Delete
//         </button>
//       </div>
//       <EditModal
//         visible={isModalVisible}
//         onHide={() => setModalVisible(false)}
//         image={image}
//         categories={categories}
//         onSave={handleSave} 
//       />
//     </div>
//   );
// };

// export default Card;

