import React from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../component/Table";
const SecondPage = () => {
  const navigate = useNavigate();
  const actionMenu = [
    {
      text: "view",
      onClick: () => navigate("detail"),
    },
    // {
    //   text: "Delete",
    //   onClick: () => alert("Delete"),
    // },
  ];
  return (
    <div className="flex flex-col items-center justify-center mt-[10%]   m-auto bg-gray-200">
      <ReusableTable
        headers={header}
        tableData={dummyTableData}
        actionMenu={actionMenu}
      />
    </div>
  );
};

export default SecondPage;
