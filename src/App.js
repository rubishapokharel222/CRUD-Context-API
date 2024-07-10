import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListProduct from "./pages/product/ListProduct";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import GlobalProvider from "./GlobalProvider";
function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <Routes>
            <Route path="/" element={<ListProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalProvider>
  );
}

export default App;
