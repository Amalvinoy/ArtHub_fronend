import React, { useState, useEffect } from "react";
import ArtisanHeader from "../components/ArtisanHeader";
import { Pencil, Camera } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  updateProductAPI, 
  getProductByIdAPI 
} from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: []
  });

  const [newImage, setNewImage] = useState(null);

  // Load Token
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t) setToken(t.replace(/"/g, ""));
  }, []);

  // Load Existing Product
  useEffect(() => {
    if (!token) return;

    const fetchProduct = async () => {
      try {
        const response = await getProductByIdAPI(id, {
          Authorization: `Bearer ${token}`
        });

        if (response.status === 200) {
          setProduct(response.data.product);
        }

      } catch (err) {
        console.error("Err loading product:", err);
      }
    };

    fetchProduct();
  }, [token]);

  // Handle Input
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Submit Update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("stock", product.stock);

      if (newImage) formData.append("image", newImage);

      const response = await updateProductAPI(id, formData, {
        Authorization: `Bearer ${token}`
      });

      if (response.status === 200) {
        alert("Product updated!");
        navigate("/artician/products");
      }

    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    }
  };

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">

        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <Pencil className="w-10 h-10 text-orange-600" />
          Edit Product
        </h1>

        <div className="bg-white/70 p-10 rounded-3xl shadow-xl max-w-4xl mx-auto space-y-8">

          {/* Image */}
          <div>
            <label className="font-semibold text-gray-700">Product Image</label>

            <div className="w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center mt-3 relative">
              
              {/* Existing Image */}
              {product.images?.length > 0 && (
                <img
                  src={product.images[0].startsWith('http') ? product.images[0] : `${serverURL}/${product.images[0]}`}
                  alt="Product"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-70"
                />
              )}

              <input 
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />

              <Camera className="w-10 h-10 text-gray-700 relative z-10" />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold">Product Name</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border-2"
            >
              <option>Jewelry</option>
              <option>Woodwork</option>
              <option>Decor</option>
              <option>Painting</option>
              <option>Crafts</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-4 rounded-xl border-2"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            onClick={handleUpdate}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}