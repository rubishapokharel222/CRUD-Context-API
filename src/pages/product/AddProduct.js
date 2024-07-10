import React, { useContext, useState } from "react";
import { ProductContext } from "../../contexts/product/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : "Field is required",
    }));
  };

  const validate = () => {
    const validationErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        validationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addProduct(formData);
      navigate("/");
      toast.success("Product Added Successfully");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

        {["title", "price", "description", "image", "category"].map((field) => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block text-gray-700 capitalize">
              {field}
            </label>
            {field === "category" ? (
              <select
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            ) : field === "description" ? (
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <input
                type={field === "price" ? "number" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
