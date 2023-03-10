import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Data from "./pages/Data";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import User from "./pages/User";
import Product from "./pages/Product";
import Transaction from "./pages/Transaction";
import EditUser from "./pages/EditUser";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import Chat from "./pages/Chat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Data />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/products" element={<Data />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/orders" element={<Data />} />
        <Route path="/orders/:id" element={<Transaction />} />
        <Route path="/income" element={<Data />} />
        <Route path="/income/:id" element={<Transaction />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
