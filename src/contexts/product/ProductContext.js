import React, { createContext, useReducer, useEffect } from "react";
import { initialProductState, productsReducer } from "./ProductReducer";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialProductState);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    dispatch({ type: "FETCH_PRODUCT_REQUEST" });
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?sort=desc"
      );
      const data = await response.json();
      dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FETCH_PRODUCT_FAILURE",
        payload: "Error fetching Product",
      });
    }
  };

  const addProduct = async (product) => {
    dispatch({ type: "ADD_PRODUCT_REQUEST" });
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      dispatch({ type: "ADD_PRODUCT_SUCCESS", payload: newProduct });
    } catch (error) {
      dispatch({
        type: "ADD_PRODUCT_FAILURE",
        payload: "Error adding product",
      });
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const updatedData = await response.json();
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: updatedData });
    } catch (error) {
      dispatch({
        type: "UPDATE_PRODUCT_FAILURE",
        payload: "Error updating product",
      });
    }
  };

  const deleteProduct = async (id) => {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: id });
    } catch (error) {
      dispatch({
        type: "DELETE_PRODUCT_FAILURE",
        payload: "Error deleting product",
      });
    }
  };

  return (
    <ProductContext.Provider
      value={{ ...state, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
