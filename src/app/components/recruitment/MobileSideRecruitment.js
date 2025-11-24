"use client";
import { useState } from "react";
import MobileSub from "../main/MobileSub";
import MobileHead from "../main/MobileHead";
import { FaCircleInfo, FaUserGraduate, FaClipboardList, FaUserPlus, FaClockRotateLeft, FaPersonCircleQuestion } from "react-icons/fa6";

const MobileSideRecruitment = () => {
  const [openSubMobile, setOpenSubMobile] = useState(false);
  const handleOpenSubMobile = () => {
    setOpenSubMobile(!openSubMobile);
  };
  return (
    <li>
      <MobileHead handleOpenSubMobile={handleOpenSubMobile} title="Recruitment" icon={<FaUserPlus className="w-5 h-5" />} />
      <ul className={`${openSubMobile ? "menu__sub-open" : ""}`}>
        <MobileSub title="Identitas" icon={<FaCircleInfo className="w-5 h-5" />} link="/admin/rekrutment/identitas" />
        <MobileSub title="Lowongan" icon={<FaClipboardList className="w-5 h-5" />} link="/admin/rekrutment/lowongan" />
        {/* <MobileSub title="Riwayat Karir" icon={<FaClockRotateLeft className="w-5 h-5" />} link="/recruitment/riwayat-karir" />
        <MobileSub title="Riwayat Pendidikan" icon={<FaUserGraduate className="w-5 h-5" />} link="/recruitment/riwayat-pendidikan" />
        <MobileSub title="Pertanyaan Personal" icon={<FaPersonCircleQuestion className="w-5 h-5" />} link="/recruitment/pertanyaan-personal" /> */}
      </ul>
    </li>
  );
};

export default MobileSideRecruitment;
