import "./App.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
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
    setModulesData,
    rolesOptions,
    setRolesOptions,
  } = useRoleContext();

  // const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // const [rolesOptions, setRolesOptions] = useState([])

  // const [modulesData, setModulesData] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      let res = await client.get("/v2-role/fetch-roles");
      setRolesOptions(
        res?.data?.result?.map((r) => ({ label: r?.role, value: r?.role_id }))
      );
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchPages = async () => {
      let res = await client.get(
        `/v2-role/fetch-page?role_id=${selectedOption}`
      );
      setModulesData(
        res?.data?.result?.[0]?.modules?.flatMap(
          (module) => module.module_urls || []
        ) || []
      );
    };
    if (selectedOption) {
      fetchPages();
    }
  }, [selectedOption]);

  const renderRoutes = () => {
    return modulesData.map((u, index) => ({
      path: u.url.replace("/", ""),
      // element: <FirstPage templateId={u?.template_id} roleId={selectedOption} />
      element: <FirstPage templateId={u?.template_id} />,
    }));
  };

  const [router, setRouter] = useState(null);

  useEffect(() => {
    if (selectedOption && modulesData.length > 0) {
      console.log(selectedOption, "ran outer");
      const newRouter = createBrowserRouter([
        {
          path: "/",
          element: <Layout />, // ✅ Pass fresh props
          // element: <Layout modulesData={modulesData} selectedOption={selectedOption} />, // ✅ Pass fresh props
          children: renderRoutes(),
        },
      ]);
      setRouter(newRouter);
    }
  }, [modulesData]);

  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-4">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select User Role
          </option>
          {rolesOptions?.map((r, i) => (
            <option value={r?.value} key={i}>
              {r?.label}
            </option>
          ))}
        </select>

        {selectedOption && (
          <span className="text-gray-700">Selected: {selectedOption}</span>
        )}
      </div>
      {router ? (
        <RouterProvider key={selectedOption} router={router} />
      ) : (
        <div className="flex justify-center min-h-[60vh] items-center ">
          <h3 className="text-3xl">Please Select a User role to begin with</h3>
        </div>
      )}
    </>
  );
}

export default App;
