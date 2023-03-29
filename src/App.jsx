import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Notfound from "./pages/Notfound";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<EditProfile />} />
        <Route path="/checkout" element={<Checkout from={"checkout"} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<Checkout from={"orders"} />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
