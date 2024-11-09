import React from "react";
import Sidebar from "../components/Homepage/Sidebar";
import {Outlet} from "react-router-dom"

const Homepage = () => {
  return (
    <div className="flex h-[98vh] gap-4">
      <div className="border rounded-lg border-teal-500 w-1/6 p-3 flex flex-col justify-between">
        {" "}
        <Sidebar />{" "}
      </div>
      <div className="border rounded-lg border-teal-500 w-5/6 p-3">
      <Outlet/>
      </div>
    </div>
  );
};

export default Homepage;
