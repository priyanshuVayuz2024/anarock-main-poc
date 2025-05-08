import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useRoleContext } from "../context/RoleContext";

function Layout() {
  const navigate = useNavigate();


  const {
    selectedOption,
    modulesData,
  } = useRoleContext();

  useEffect(() => {
    navigate("/");
  }, [selectedOption]);


  return (
    <>
      {selectedOption ?
        <div className="border rounded-sm min-h-[88vh] relative mx-5 my-2 ">

          <div className="flex gap-2 justify-center my-10">
            <Link to={"/"} className="absolute left-2 top-2 text-blue-400" >{`<-- Home`}</Link>
            {modulesData?.map((m, i) => (
              <button
                key={i}
                onClick={() => navigate(`${m.url.replace("/", "")}`)}
                className="bg-blue-500 px-3 py-2 rounded-md text-white"
              >
                {m.name}
              </button>
            ))}

          </div>
          <Outlet />

        </div>
        :
        <div className="flex justify-center min-h-[60vh] items-center ">
          <h3 className="text-3xl">Please Select a User role to begin with</h3>
        </div>

      }
    </>
  );
}

export default Layout;
