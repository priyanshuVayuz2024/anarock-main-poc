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





const FirstPage = ({ }) => {
  const [comps, setComps] = useState([])
  const [tableComps, setTableComps] = useState([])

  const {
    selectedOption: roleId,
    templateId,
    selectedOptionComm
  } = useRoleContext();

  useEffect(() => {
    const fetchTemplate = async () => {
      let res = await client.get(`/v2-role/fetch-components?template_id=${templateId}&role_id=${roleId}&community_id=${selectedOptionComm}`)
      let temp = []
      let tableTemp = []

      res?.data?.result?.forEach(rs => {
        if (rs?.component_data?.type == "btn" && !rs?.is_deactived) {
          temp.push({ link: rs?.component_data?.link, label: rs?.component_data?.label })
        } else if (rs?.component_data?.type == "table" && !rs?.component_data?.is_deactived) {
          tableTemp = rs?.table_children
        }
      })
      setComps(temp)
      setTableComps(tableTemp)
    }



    fetchTemplate()
  }, [templateId, roleId, selectedOptionComm])


  const navigate = useNavigate()



  const actionMenu = []
  tableComps?.forEach((m) => {
    if (m?.[`table-child-component-permission`]?.length > 0 && m?.[`table-child-component-permission`]?.[0]?.is_active) {
      actionMenu.push(
        {
          text: m?.label,
          onClick: () => navigate(m?.link)
        }
      )
    }
  });




  return (
    <>
      {templateId ?
        <div className="flex flex-col gap-20 items-center justify-center m-auto">
          <h1>Page in the end</h1>
          <div className="flex gap-2 justify-center my-2">
            {comps.map((m, i) => {
              return <button
                key={i}
                onClick={() => navigate(`${m.link.replace("/", "")}`)}
                className="bg-blue-500 px-3 py-2 rounded-md text-white"
              >
                {m.label}
              </button>
            })}

          </div>
          <ReusableTable
            headers={headers}
            tableData={tableData}
            actionMenu={actionMenu}
          />
        </div >
        :
        <div className="flex justify-center">
          <h3 className="py-20">Default Page</h3>
        </div>
      }

    </>
  );
};

export default FirstPage;
