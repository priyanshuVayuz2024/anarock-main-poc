import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useRoleContext } from "../context/RoleContext";

function PageLayout() {
    const navigate = useNavigate();


    const {
        modulesData,
        selectedOption,
        selectedOptionComm,
        templateId,
        setTemplateId
    } = useRoleContext();

    // useEffect(() => {
    //   navigate("/");
    // }, [selectedOption]);

    console.log(modulesData, 'modules');

    return (
        <>
            {selectedOption && selectedOptionComm && modulesData?.length > 0 ?
                <div className="border rounded-sm min-h-[88vh] relative mx-5 my-2 ">
                    <div className="px-4 pt-2">
                        {modulesData?.filter(md => md?.module_permission?.length)?.map((m, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setTemplateId(m?.template_id)
                                    navigate(`${m?.url?.replace("/", "")}`)
                                }}
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
                    <h3 className="text-3xl">Loading</h3>
                </div>

            }
        </>
    );
}

export default PageLayout;









// <Link to={"/"} className="absolute left-2 top-2 text-blue-400" >{`<-- Home`}</Link>
