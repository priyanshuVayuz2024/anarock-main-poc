import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export default client;

// const response = await client.get('/modules');
// return response.data;
