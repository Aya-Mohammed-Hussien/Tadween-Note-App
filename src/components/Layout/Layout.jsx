import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <div className="bg-gray-200 dark:bg-gray-900 ml-12 md:ml-24 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
