import axios from "axios";

const API = axios.create({
  baseURL: "https://fakestoreapi.com"
});

export const getProducts = () => API.get("/products");
export const getCategories = () => API.get("/products/categories");