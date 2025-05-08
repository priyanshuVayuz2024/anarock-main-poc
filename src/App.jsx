import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReusableTable from "./component/Table";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Layout from "./component/Layout";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";
import FirstPage from "./pages/FirstPage";

export const header = [
  {
    title: "Resume",
    // sortKey: "title",
    // action: facilityNameActions,
    // columnHideKey: "title",
    isSearchAble: false,
  },
  {
    title: "Job Title",
    // sortKey: "brand",
    // action: facilityNameActions,
    // columnHideKey: "brand",
    isSearchAble: false,
    // pin: true,
  },
  {
    title: "Score",
  },
];

// export const dummyData = [
//     {
//         sno:
//     }
// ]

export const dummyTableData = [
  {
    name: {
      text: "Priyanshu resume",
      url: "https://example.com/users/alice",
      link: true,
      id: "user1",
    },
    jd: {
      text: "React Internal",
      url: "",
      link: false,
      id: "gender1",
    },
    score: {
      text: "85",
      url: "",
      link: false,
      id: "age1",
    },
  },
  {
    name: {
      text: "updatedResume",
      url: "https://example.com/users/bob",
      link: true,
      id: "user2",
    },
    gender: {
      text: "Php developer",
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
  },
  {
    name: {
      text: "Resume neha Aswal",
      url: "https://example.com/users/charlie",
      link: true,
      id: "user3",
    },
    gender: {
      text: "Python developer",
      url: "",
      link: false,
      id: "gender3",
    },
    age: {
      text: "80",
      url: "",
      link: false,
      id: "age3",
    },
  },
];

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          path: "/firstpage",
          element: <FirstPage />,
        },
        {
          index: true,
          path: "/second",
          element: <SecondPage />,
        },
        {
          index: true,
          path: "/third",
          element: <ThirdPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
