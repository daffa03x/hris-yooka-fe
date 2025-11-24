"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBarsStaggered, FaCircleXmark, FaHouse, FaArrowRightFromBracket } from "react-icons/fa6";
import MobileSub from "./MobileSub";
import { useRouter } from "next/navigation";
import { logout } from "@/app/services/auth";
import MobileSidePegawai from "../pegawai/MobileSidePegawai";
import MobileSideAsset from "../asset/MobileSideAsset";
import MobileSidePengaturan from "../pengaturan/MobileSidePengaturan";
import MobileSideRecruitment from "../recruitment/MobileSideRecruitment";
import MobileSideUserPegawai from "../pegawai/MobileSideUserPegawai";
import MobileSideUserAsset from "../asset/MobileSideUserAsset";

const MobileSidebar = ({ link_profile, link_ubah_password, user}) => {
  const router = useRouter();
  const [openMobile, setOpenMobile] = useState(false);

  const handleOpenMobile = () => {
    setOpenMobile(!openMobile);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      router.push("/");
    } else {
      console.log("kesalahan saat logout");
    }
  };
  return (
    <div className={`mobile-menu md:hidden ${openMobile ? "mobile-menu--active" : ""}`}>
      <div className="mobile-menu-bar">
        <Link href="/" className="flex mr-auto text-white">
          Yooka
        </Link>
        <button onClick={handleOpenMobile} className="mobile-menu-toggler">
          <FaBarsStaggered className="w-6 h-6 text-white" />
        </button>
      </div>
      {openMobile && (
        <div className="scrollable" style={{ overflowY: "auto" }}>
          <button onClick={handleOpenMobile} className="mobile-menu-toggler">
            <FaCircleXmark className="w-6 h-6 text-white" />
          </button>
          <ul className="scrollable__content py-2">
            {user?.role === "admin" ? (
              <>
                <MobileSub link="/admin/dashboard" icon={<FaHouse className="w-5 h-5" />} title="Dashboard" />
                <MobileSidePegawai />
                <MobileSideRecruitment />
                <MobileSideAsset />
              </>
            ) : (
              <>
                <MobileSub link="/user/dashboard" icon={<FaHouse className="w-5 h-5" />} title="Dashboard" />
                <MobileSideUserPegawai id={user?.id} />
                <MobileSideUserAsset id={user?.id} />
              </>
            )}
            <MobileSidePengaturan link_profile={link_profile} link_ubah_password={link_ubah_password}/>
            <li>
              <div onClick={handleLogout} className="menu cursor-pointer">
                <div className="menu__icon">
                  <FaArrowRightFromBracket className="w-5 h-5" />
                </div>
                <div className="menu__title">Logout</div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
