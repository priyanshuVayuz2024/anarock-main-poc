import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { buttons } from "../utils";
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
    <div className="flex flex-col gap-20 items-center justify-center mt-[10%] m-auto">
      <div className="flex gap-2">
        {buttons.map((button) => (
          <button
            className={button.className}
            onClick={() => navigate(`${button.to}`)}
          >
            {button.text}
          </button>
        ))}
      </div>
      {/* <ReusableTable
        headers={header}
        tableData={dummyTableData}
        actionMenu={actionMenu}
      /> */}
      <p className="text-4xl">
        Table
      </p>
    </div>
  );
};

export default FirstPage;
