import axios from "axios";

const client = axios.create({
  baseURL: "https://anarock-super-admin.vayuz.com",

  headers: {
    "Content-Type": "application/json",
  },

});

export default client;

// const response = await client.get('/modules');
// return response.data;
