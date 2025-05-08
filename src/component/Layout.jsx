import { Outlet, useNavigate } from "react-router-dom";
import { buttons } from "../utils";
function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-4">
        {buttons.map((button) => (
          <button
            className={button.className}
            onClick={() => navigate(`${button.to}`)}
          >
            {button.text}
          </button>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
