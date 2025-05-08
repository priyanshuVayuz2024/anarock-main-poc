import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { header, dummyTableData } from "../App";
import ReusableTable from "../component/Table";
import client from "../client";
const FirstPage = () => {
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
//   const fetchPosts = async () => {
//     const response = await client.get("/posts");
//     return response.data;
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

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

export default FirstPage;
