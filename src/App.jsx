import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Data from "./pages/Data";
import SignIn from "./pages/SignIn";
import Statistics from "./pages/Statistics";
import User from "./pages/User";
import Product from "./pages/Product";
import Transaction from "./pages/Transaction";
import EditUser from "./pages/EditUser";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import Chat from "./pages/Chat";
import SlidePreview from "./pages/SlidePreview";
import axios from "axios";
import Order from "./pages/Order";
import AddUser from "./pages/AddUser";
import EditSlide from "./pages/EditSlide";
import EditPreview from "./pages/EditPreviews";
import NotFound from "./pages/NotFound";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/users" element={<Data />} />
        <Route path="/add/user" element={<AddUser />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/products" element={<Data />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/orders" element={<Data />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/transactions" element={<Data />} />
        <Route path="/transactions/:id" element={<Transaction />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/slide&preview" element={<SlidePreview />} />
        <Route path="/slide/:id" element={<EditSlide />} />
        <Route path="/preview/:id" element={<EditPreview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
