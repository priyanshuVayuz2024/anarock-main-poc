import React, { useEffect, useState } from "react";
import client from "../client";

const FirstPage = ({ templateId, roleId }) => {
  const [comps, setComps] = useState([])
  const [tableComps, setTableComps] = useState([])


  useEffect(() => {
    console.log('ran fetch out');
    const fetchTemplate = async () => {
      let res = await client.get(`/v2-role/fetch-components?template_id=${templateId}&role_id=${roleId}`)

      console.log('ran fetch');




      let temp = []
      let tableTemp = []
      res?.data?.result?.forEach(rs => {
        temp.push(rs?.[`template-components`]?.[0]?.component_data?.[0])
        if (rs?.table_data?.length > 0) {
          tableTemp = [...tableTemp, ...rs?.table_data?.[0]?.[`table-components`]?.map(tc => tc?.component_data?.[0])]
        }
      })
      setComps(temp)
      setTableComps(tableTemp)
      // setModulesData(res?.data?.result?.[0]?.modules?.flatMap(module => module.module_urls || []) || []);
    }



    fetchTemplate()
  }, [templateId, roleId])


  console.log(comps, tableComps, 'okokok');


  return (
    <div className="flex flex-col gap-20 items-center justify-center mt-[10%] m-auto">
      <div className="flex gap-2 justify-center my-10">
        {comps.map((m, i) => {
          if (m?.type == "btn") {
            return <button
              key={i}
              onClick={() => navigate(`${m.link.replace("/", "")}`)}
              className="bg-blue-500 px-3 py-2 rounded-md text-white"
            >
              {m.label}
            </button>
          }
        })}

      </div>
      <p className="text-4xl">
        Table
      </p>
    </div >
  );
};

export default FirstPage;
