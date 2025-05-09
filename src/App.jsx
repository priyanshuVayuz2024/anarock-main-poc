import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import FirstPage from "./pages/FirstPage";
import client from "./client";
import Layout from "./component/Layout";
import { useRoleContext } from "./context/RoleContext";

function App() {
  const {
    selectedOption,
    setSelectedOption,
    modulesData,
    rolesOptions,
    selectedOptionComm,
    setSelectedOptionComm,
    communitiesOptions,
    sidebarURLs,
    totalURLs,
    count
  } = useRoleContext();


  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChangeComm = (e) => {
    setSelectedOptionComm(e.target.value);
  };

  console.log(sidebarURLs, totalURLs, 'liabi');


  const renderRoutes = () => {
    console.log(totalURLs, 'total URs');

    return totalURLs.map((u, index) => ({
      path: u?.url.replace("/", ""),
      // element: <FirstPage templateId={u?.template_id} />,
      element: <FirstPage />,
    }));
  };

  const [router, setRouter] = useState(null);


  useEffect(() => {
    console.log(renderRoutes(), 'wow');

    const routes = [
      {
        path: "/",
        element: <Layout />,
        ...(selectedOption && selectedOptionComm && totalURLs.length > 0 && { children: renderRoutes() }),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ];

    setRouter(createBrowserRouter(routes));
  }, [selectedOption, totalURLs, selectedOptionComm, count]);



  return <>
    <div className="flex gap-10 justify-center">

      <div className="flex justify-center items-center gap-4 mt-4">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select User Role</option>
          {rolesOptions?.map((r, i) => (
            <option value={r?.value} key={i}>{r?.label}</option>
          ))}
        </select>

        {selectedOption && (
          <span className="text-gray-700">Selected: {rolesOptions?.filter(rol => rol?.value == selectedOption)?.[0]?.label}</span>
        )}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <select
          value={selectedOptionComm}
          onChange={handleChangeComm}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select Community</option>
          {communitiesOptions?.map((r, i) => (
            <option value={r?.value} key={i}>{r?.label}</option>
          ))}
        </select>

        {selectedOptionComm && (
          <span className="text-gray-700">Selected: {communitiesOptions?.filter(rol => rol?.value == selectedOptionComm)?.[0]?.label}</span>
        )}
      </div>
    </div>
    {router ? (
      <RouterProvider key={{ ...selectedOption, ...selectedOptionComm }} router={router} />
    ) : (
      <div className="flex justify-center min-h-[60vh] items-center ">
        <h3 className="text-3xl">Please Select a User role to begin with</h3>
      </div>
    )}
  </>
}

export default App;
