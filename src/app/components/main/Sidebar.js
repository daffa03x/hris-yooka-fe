"use client";
import { FaHouse, FaArrowRightFromBracket, FaUser } from "react-icons/fa6";
import SubSidebar from "./SubSidebar";
import SidebarPegawai from "../pegawai/SidebarPegawai";
import SidebarAsset from "../asset/SidebarAsset";
import SidebarPengaturan from "../pengaturan/SidebarPengaturan";
import { logout } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import SidebarRecruitment from "../recruitment/SiderbarRecruitment";
import { useState } from "react";
// import SidebarUser from "../pegawai/SiderbarUser";
import SidebarUserAsset from "../asset/SidebarUserAsset";

const Sidebar = ({ link_profile, link_ubah_password, user}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      localStorage.removeItem("pegawai");
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="side-nav">
      <ul>
        {user?.role === "admin" ? (
          <>
            <SubSidebar title="Dashboard" icon={<FaHouse className="w-5 h-5" />} link="/admin/dashboard" />
            <SidebarPegawai />
            <SidebarRecruitment />
            <SidebarAsset />
          </>
        ) : (
          <>
            <SubSidebar title="Dashboard" icon={<FaHouse className="w-5 h-5" />} link="/user/dashboard" />
            <SubSidebar title="Information" icon={<FaUser className="w-5 h-5" />} link="/user/information" />
            {/* <SidebarUser id={user?.id}/> */}
            <SidebarUserAsset id={user?.id}/>
          </>
        )}
        <SidebarPengaturan link_profile={link_profile} link_ubah_password={link_ubah_password} />
        <li>
          {loading ? (
            <button className="side-menu" disabled>
              Loading...
            </button>
          ) : (
            <div className="side-menu cursor-pointer" onClick={handleLogout}>
              <div className="side-menu__icon">
                <FaArrowRightFromBracket className="w-5 h-5" />
              </div>
              <div className="side-menu__title">Loogut</div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
