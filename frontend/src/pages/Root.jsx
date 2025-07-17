import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
