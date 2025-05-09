import { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useRoleContext } from "../context/RoleContext";
import PageLayout from "../pages/PageLayout";
import client from "../client";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();


  const {
    selectedOption,
    setModulesData,
    selectedOptionComm,
    sidebarURLs,
    setTotalURLs,
    setCount
  } = useRoleContext();

  // useEffect(() => {
  //   navigate("/");
  // }, [selectedOption]);
  useEffect(() => {
    const fetchModules = async () => {
      if (!sidebarURLs.length) return;
      const currentPath = window.location.pathname;
      const matched = sidebarURLs.find(({ url }) =>
        currentPath.startsWith(url)
      );

      const moduleId = matched?.module;
      if (!moduleId) return;


      let res = await client.get(
        `/v2-role/fetch-modules?module_id=${moduleId}&role_id=${selectedOption}`
      );
      let temp = []
      res?.data?.result?.[0]?.modules?.[0]?.module_urls?.forEach(md => {
        if (md?.module_permission?.length > 0) {
          temp?.push({ url: md?.url, module: md?.module_id })
        }
      })
      console.log(temp, 're rann', res?.data?.result?.[0]?.modules);
      setTotalURLs(p => [...p, ...temp])
      setModulesData(
        res?.data?.result?.[0]?.modules?.flatMap(
          (module) => module.module_urls || []
        ) || []
      );
    };
    if (selectedOption && selectedOptionComm && sidebarURLs.length) {
      fetchModules();
    }
  }, [selectedOption, selectedOptionComm, sidebarURLs, location]);

  return (
    <>
      {selectedOption && selectedOptionComm ?
        <div className="border rounded-sm min-h-[88vh] relative mx-5 my-2 flex ">
          <div>

            <aside className="w-60 border-r p-4">
              <h2 className="text-lg font-semibold mb-4">Modules</h2>
              <ul className="space-y-2">
                {sidebarURLs.map(({ url, label }, index) => (
                  <li key={index}>
                    <Link
                      to={url}
                      onClick={() => {
                        setCount(p => p + 1) // <-- Call your setState here
                      }}
                      className={`block px-3 py-2 rounded-md hover:bg-gray-200 ${location.pathname.startsWith(url) ? "bg-gray-300 font-semibold" : ""
                        }`}
                    >
                      {label || url.replace("/", "").toUpperCase() || "HOME"}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
            {/* <Outlet />
           */}

          </div>
          <div className="w-full">
            <PageLayout />
          </div>

        </div>
        :
        <div className="flex justify-center min-h-[60vh] items-center ">
          <h3 className="text-3xl">Please Select a User role and Community to begin with</h3>
        </div>

      }
    </>
  );
}

export default Layout;









// <Link to={"/"} className="absolute left-2 top-2 text-blue-400" >{`<-- Home`}</Link>
// {modulesData?.map((m, i) => (
//   <button
//     key={i}
//     onClick={() => navigate(`${m.url.replace("/", "")}`)}
//     className="bg-blue-500 px-3 py-2 rounded-md text-white"
//   >
//     {m.name}
//   </button>
// ))}