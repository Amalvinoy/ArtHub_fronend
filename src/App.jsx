import "./App.css";
import { Routes, Route } from "react-router-dom";

// Authentication Pages
import Auth from "./pages/Auth";

// Customer Pages
import Home from "./customers/pages/Home";
import CustomerDashboard from "./customers/pages/CustomerDashboard";
import ProductDetails from "./customers/pages/ProductDetails";
import CustomerOrders from "./customers/pages/CustomerOrders";
import Cart from "./customers/pages/Cart";
import Checkout from "./customers/pages/Checkout";
import MyWorkshopsUser from "./customers/pages/MyWorkshops";
import WorkshopDetails from "./customers/pages/WorkshopDetails";
import CustomerProfile from "./customers/pages/CustomerProfile";

// Admin Pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageProducts from "./admin/pages/ManageProducts";
import ManageUsers from "./admin/pages/ManageUsers";
import ManageOrders from "./admin/pages/ManageOrders";
import AdminProfile from "./admin/pages/AdminProfile";

import ProductDetailsAdmin from "./admin/pages/ProductDetails";
import UserDetails from "./admin/pages/UserDetails";
import OrderDetails from "./admin/pages/OrderDetails";
import ManageWorkshops from "./admin/pages/ManageWorkshops";
import WorkshopDetailsAdmin from "./admin/pages/WorkshopDetails";

// Artician Pages
import ArticianDashboard from "./artician/pages/ArtisanDashboard";
import MyProducts from "./artician/pages/MyProducts";
import AddProductArtician from "./artician/pages/AddProduct";
import EditProductArtician from "./artician/pages/EditProduct";

import MyOrders from "./artician/pages/MyOrders";
import OrderDetailsArtician from "./artician/pages/OrderDetails";

import MyWorkshops from "./artician/pages/MyWorkshops";
import AddWorkshop from "./artician/pages/AddWorkshop";
import EditWorkshop from "./artician/pages/EditWorkshop";
import ViewProduct from "./artician/pages/ProductDetails";
import ViewWorkshop from "./artician/pages/WorkshopDetails";

import ArticianProfile from "./artician/pages/ArtisanProfile";


function App() {
  return (
    <Routes>

      // Authentication Pages
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      // Customer Pages
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/orders" element={<CustomerOrders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/workshops" element={<MyWorkshopsUser />} />
      <Route path="/workshop/:id" element={<WorkshopDetails />} />
      <Route path="/profile" element={<CustomerProfile />} />

      // Admin Pages
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/admin/products" element={<ManageProducts />} />
      <Route path="/admin/productdetails/:id" element={<ProductDetailsAdmin />} />

      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/usersdetails" element={<UserDetails />} />

      <Route path="/admin/orders" element={<ManageOrders />} />
      <Route path="/admin/orderdetails" element={<OrderDetails />} />
      
      <Route path="/admin/workshops" element={<ManageWorkshops />} />
      <Route path="/admin/workshopdetails/:id" element={<WorkshopDetailsAdmin />} />
      <Route path="/admin/profile" element={<AdminProfile />} />

      // Artician Pages
      <Route path="/artician" element={<ArticianDashboard />} />

      <Route path="/artician/products" element={<MyProducts />} />
      <Route path="/artician/products/add" element={<AddProductArtician />} />
      <Route path="/artician/products/edit/:id" element={<EditProductArtician />} />
      <Route path="/artician/products/view/:id" element={<ViewProduct />} />

      <Route path="/artician/orders" element={<MyOrders />} />
      <Route path="/artician/ordersdetails" element={<OrderDetailsArtician />} />

      <Route path="/artician/workshops" element={<MyWorkshops />} />
      <Route path="/artician/workshops/add" element={<AddWorkshop />} />
      <Route path="/artician/workshops/edit/:id" element={<EditWorkshop />} />
      <Route path="/artician/workshops/view/:id" element={<ViewWorkshop />} />

      <Route path="/artician/profile" element={<ArticianProfile />} />

    </Routes>
  );
}

export default App;



