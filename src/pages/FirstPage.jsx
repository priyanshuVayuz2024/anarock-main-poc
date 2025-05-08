import React, { useEffect, useState } from "react";
import client from "../client";
import { Navigate, useNavigate } from "react-router-dom";
import { useRoleContext } from "../context/RoleContext";
import ReusableTable from "../component/Table";


const headers = [
  {
    title: "title",
    // sortKey: "title",
    // action: facilityNameActions,
    columnHideKey: "title",
    isSearchAble: false,
  },
  {
    title: "brand",
    sortKey: "brand",
    // action: facilityNameActions,
    columnHideKey: "brand",
    isSearchAble: false,
    pin: true,
  },
  {
    title: "category",
    // sortKey: "category",
    // action: facilityNameActions,
    isSearchAble: false,
  },
  {
    title: "price",
    // sortKey: "price",
    // action: facilityNameActions,
    columnHideKey: "price",
    isSearchAble: false,
    pin: true,
  },
  // {
  //   title: "rating",
  //   // sortKey: "rating",
  //   // action: facilityNameActions,
  //   columnHideKey: "rating",
  //   isSearchAble: false,
  //   pin: true,
  // },
];


const tableData = [
  {
    name: {
      text: "Alice Johnson",
      url: "https://example.com/users/alice",
      link: true,
      id: "user1",
    },
    gender: {
      text: "Female",
      url: "",
      link: false,
      id: "gender1",
    },
    age: {
      text: "29",
      url: "",
      link: false,
      id: "age1",
    },
    place: {
      text: "New York",
      url: "https://maps.example.com/new-york",
      link: true,
      id: "place1",
    },
  },
  {
    name: {
      text: "Bob Smith",
      url: "https://example.com/users/bob",
      link: true,
      id: "user2",
    },
    gender: {
      text: "Male",
      url: "",
      link: false,
      id: "gender2",
    },
    age: {
      text: "35",
      url: "",
      link: false,
      id: "age2",
    },
    place: {
      text: "San Francisco",
      url: "https://maps.example.com/sf",
      link: true,
      id: "place2",
    },
  },
  {
    name: {
      text: "Charlie Lee",
      url: "https://example.com/users/charlie",
      link: true,
      id: "user3",
    },
    gender: {
      text: "Non-binary",
      url: "",
      link: false,
      id: "gender3",
    },
    age: {
      text: "22",
      url: "",
      link: false,
      id: "age3",
    },
    place: {
      text: "Chicago",
      url: "https://maps.example.com/chicago",
      link: true,
      id: "place3",
    },
  },
];





const FirstPage = ({ templateId }) => {
  const [comps, setComps] = useState([])
  const [tableComps, setTableComps] = useState([])

  const {
    selectedOption: roleId,
  } = useRoleContext();

  useEffect(() => {
    const fetchTemplate = async () => {
      let res = await client.get(`/v2-role/fetch-components?template_id=${templateId}&role_id=${roleId}`)
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


  const navigate = useNavigate()



  const actionMenu = []
  tableComps?.forEach((m) => {
    if (m?.[`table-components-permission`]?.length > 0) {
      actionMenu.push(
        {
          text: m?.label,
        }
      )
    }
  });




  return (
    <>

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
          <ReusableTable
            headers={headers}
            tableData={tableData}
            actionMenu={actionMenu}
          />
        </p>
      </div >

    </>
  );
};

export default FirstPage;
