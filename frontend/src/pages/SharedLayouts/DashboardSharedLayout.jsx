import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "@components/Navbar/DashboardNavbar/DashboardNavbar";

function DashboardSharedLayout() {
  return (
    <>
      <DashboardNavbar />
      <Outlet />
    </>
  );
}

export default DashboardSharedLayout;
