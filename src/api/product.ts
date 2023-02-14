import axios from "axios";

export const getProduct = async () => await axios.get('http://localhost:8000/product/')