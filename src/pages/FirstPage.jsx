import React from "react";

const FirstPage = ({ templateId }) => {
  console.log(templateId, 'temp');


  return (
    <div className="flex flex-col gap-20 items-center justify-center mt-[10%] m-auto">
      <p className="text-4xl">
        Table
      </p>
    </div>
  );
};

export default FirstPage;
