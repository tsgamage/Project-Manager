import { Outlet } from "react-router-dom";
import MiniNavbar from "../../components/Common/MiniNavbar";
import Footer from "../../components/Common/Footer";

export default function AuthRoot() {
  return (
    <>
      <MiniNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
