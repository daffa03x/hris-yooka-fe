"use client";
import { useState } from "react";
import HeadSidebar from "../main/HeadSidebar";
import SubSidebar from "../main/SubSidebar";
import { FaGear, FaUserGear, FaLock } from "react-icons/fa6";

const SidebarPengaturan = ({ link_profile, link_ubah_password }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <li>
      <HeadSidebar icon={<FaGear className="w-5 h-5" />} title="Pengaturan Akun" openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar}>
        <ul className={`${openSidebar ? "side-menu__sub-open" : ""}`}>
          <SubSidebar title="Ubah Profile" icon={<FaUserGear className="w-5 h-5" />} link={link_profile} />
          <SubSidebar title="Ubah Password" icon={<FaLock className="w-5 h-5" />} link={link_ubah_password} />
        </ul>
      </HeadSidebar>
    </li>
  );
};

export default SidebarPengaturan;
