import { Outlet, useNavigate } from "react-router-dom";

function Layout({ modulesData }) {



  const navigate = useNavigate()

  return (
    <>
      <div className="flex gap-2 justify-center my-10">
        <button
          onClick={() => navigate(`/`)}
          className="bg-blue-900 mr-10 px-3 py-2 rounded-md text-white"
        >
          Home
        </button>
        {modulesData.map((m, i) => (
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

    </>
  );
}

export default Layout;
