import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReusableTable from "./component/Table";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./component/Layout";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";
import FirstPage from "./pages/FirstPage";
import client from "./client";

function App() {

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [rolesOptions, setRolesOptions] = useState([])


  useEffect(() => {

    // call api based on user 
    const fetchRoles = async () => {
      let res = await client.get('/v2-role/fetch-roles')
      setRolesOptions(res.data.reul)

    }


    fetchRoles()

  }, [])





  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <FirstPage />,
        },
        {
          index: true,
          path: "second",
          element: <SecondPage />,
        },
        {
          index: true,
          path: "third",
          element: <ThirdPage />,
        },
      ],
    },
  ]);
  return <>
    <div className="flex justify-center items-center gap-4 mt-4">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="" disabled>Select User Role</option>
        <option value="option1">User 1</option>
        <option value="option2">User 2</option>
        <option value="option3">User 3</option>
      </select>

      {selectedOption && (
        <span className="text-gray-700">Selected: {selectedOption}</span>
      )}
    </div>
    {selectedOption ?
      <RouterProvider router={router} /> :
      <>
        <div className="flex justify-center min-h-[60vh] items-center ">
          <h3 className="text-3xl">Please Select an User role to begin with</h3>
        </div>
      </>
    }
  </>
}

export default App;
