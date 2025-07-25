import { Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
