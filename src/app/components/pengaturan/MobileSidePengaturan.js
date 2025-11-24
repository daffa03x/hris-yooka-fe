"use client";
import { useState } from "react";
import MobileSub from "../main/MobileSub";
import MobileHead from "../main/MobileHead";
import { FaGear, FaUserGear, FaLock } from "react-icons/fa6";

const MobileSidePengaturan = () => {
  const [openSubMobile, setOpenSubMobile] = useState(false);
  const handleOpenSubMobile = () => {
    setOpenSubMobile(!openSubMobile);
  };
  return (
    <li>
      <MobileHead handleOpenSubMobile={handleOpenSubMobile} title="Pengaturan Akun" icon={<FaGear className="w-5 h-5" />} />
      <ul className={`${openSubMobile ? "menu__sub-open" : ""}`}>
        <MobileSub title="Ubah Profile" icon={<FaUserGear className="w-5 h-5" />} link="/pengaturan/profile" />
        <MobileSub title="Ubah Password" icon={<FaLock className="w-5 h-5" />} link="/pengaturan/password" />
      </ul>
    </li>
  );
};

export default MobileSidePengaturan;
