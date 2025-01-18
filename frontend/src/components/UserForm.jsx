import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    handle: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {addTask,isAddingTask} = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleFileChange = async(e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async ()=>{
      const base64Image = reader.result;
      setSelectedFiles([...selectedFiles,base64Image])
    }

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Selected Files:", selectedFiles);
    if(formData.name.length == 0){
      toast.error("Name is required.")
      return;
    }
    if(formData.handle.length == 0){
      toast.error("Media handle is required.")
      return;
    }
    if(selectedFiles.length == 0){
      toast.error("Images are required.")
      return;
    }
    await addTask({name : formData.name , handle:formData.handle , imageUrls : selectedFiles})
    setFormData({name : "",handle:""});
    setSelectedFiles([])
  };

  return (
    <div className="max-w-md mt-32 flex flex-col space-y-4 min-h-96 w-full mr-2 ml-2 mx-auto p-4 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4 text-gray-700">User Submission Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="handle" className="block text-sm font-medium text-gray-600">
            Social Media Handle
          </label>
          <input
            type="text"
            id="handle"
            name="handle"
            value={formData.handle}
            onChange={handleInputChange}
            placeholder="Enter Your Social media Handle"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="files" className="block text-sm font-medium text-gray-600">
            Upload Images
          </label>
          <input
            type="file"
            id="files"
            multiple
            onChange={handleFileChange}
            className="w-full mt-1"
          />
          {selectedFiles.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              {selectedFiles.length} file(s) selected.
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isAddingTask ? "..." :"Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
