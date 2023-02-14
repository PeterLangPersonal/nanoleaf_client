import axios from "axios";

export const getMarketingData = async () => await axios.get('http://localhost:8000/marketingData/')