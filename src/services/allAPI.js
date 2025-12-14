import { serverURL } from "./serverURL";
import commonAPI from "./commonAPI";

// Register User
export const registerUserAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/api/registerUser`, reqBody, {});
}

// Login User
export const loginUserAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/api/loginUser`, reqBody, {});
}

// Google OAuth Login
export const googleAuthAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/api/googleAuth`, reqBody, {});
}

// Add Product (Artician)
export const addProductAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${serverURL}/api/artician/addProduct`, reqBody, reqHeader);
};

// Get Products by Artician
export const getArticianProductsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/artician/products`, null, reqHeader);
}

// Get Product by ID (Artician)
export const getProductByIdAPI = async (productId, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/artician/products/${productId}`, null, reqHeader);
}

// Add Workshop (Artician)
export const addWorkshopAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/api/artician/addWorkshop`, reqBody, reqHeader);
}

// Get Workshops by Artician
export const getArticianWorkshopsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/artician/workshops`, null, reqHeader);
}

// Get Workshop by ID (Artician)
export const getWorkshopByIdAPI = async (workshopId, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/artician/workshops/${workshopId}`, null, reqHeader);
}

//Update Product (Artician)
export const updateProductAPI = async (productId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/api/artician/editProduct/${productId}`, reqBody, reqHeader);
}

// Update Workshop (Artician)
export const updateWorkshopAPI = async (workshopId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/api/artician/editWorkshop/${workshopId}`, reqBody, reqHeader);
}

// Delete Product (Artician)
export const deleteProductAPI = async (productId, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/api/artician/deleteProduct/${productId}`, null, reqHeader);
}

// Delete Workshop (Artician)
export const deleteWorkshopAPI = async (workshopId, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/api/artician/deleteWorkshop/${workshopId}`, null, reqHeader);
}

// Get Artician Profile
export const getArticianProfileAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/artician/profile`, null, reqHeader);
}

// Update Artician Profile
export const updateArticianProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/api/artician/updateprofile`, reqBody, reqHeader);
}

//------- User APIs -------

// Get Products for User
export const getUserProductsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/user/products`, null, reqHeader);
}

// Get Workshops for User
export const getUserWorkshopsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/user/workshops`, null, reqHeader);
}

// Get Product by ID for User
export const getProductByIdForUserAPI = async (productId, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/user/products/${productId}`, null, reqHeader);
}

// Get Workshop by ID for User
export const getWorkshopByIdForUserAPI = async (workshopId, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/user/workshops/${workshopId}`, null, reqHeader);
}

// Get Customer Profile
export const getCustomerProfileAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/user/profile`, null, reqHeader);
}

// Update Customer Profile
export const updateCustomerProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/api/user/updateprofile`, reqBody, reqHeader);
}

//------Admin APIs-----

// Get All Users
export const getAllUsersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/admin/users`, null, reqHeader);
}

// Get All Articians
export const getAllArticiansAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/admin/articians`, null, reqHeader);
}

// Get All Products
export const getAllProductsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/admin/products`, null, reqHeader);
}

// Get All Workshops
export const getAllWorkshopsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/admin/workshops`, null, reqHeader);
}

// Get Product by ID
export const getProductByIdAdminAPI = async (productId, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/admin/products/${productId}`, null, reqHeader);
}

// Get Workshop by ID
export const getWorkshopByIdAdminAPI = async (workshopId, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/api/admin/workshops/${workshopId}`, null, reqHeader);
}

// Delete Product by ID
export const deleteProductByIdAPI = async (productId, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/api/admin/deleteProduct/${productId}`, null, reqHeader);
}

// Delete Workshop by ID
export const deleteWorkshopByIdAPI = async (workshopId, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/api/admin/deleteWorkshop/${workshopId}`, null, reqHeader);
}

// Delete User by ID
export const deleteUserByIdAPI = async (userId, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/api/admin/deleteUser/${userId}`, null, reqHeader);
}

// Approve or block Artician
export const approveOrBlockArticianAPI = async (articianId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/api/admin/updateArticianStatus/${articianId}`, reqBody, reqHeader);
}