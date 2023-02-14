import axios from "axios";

export const getSalesOrder = async () => await axios.get('http://localhost:8000/salesOrder/')