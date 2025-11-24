"use client";
import { useState } from "react";
import HeadSidebar from "../main/HeadSidebar";
import SubSidebar from "../main/SubSidebar";
import { FaCircleInfo, FaUserGraduate, FaClipboardList, FaUserPlus, FaClockRotateLeft, FaPersonCircleQuestion } from "react-icons/fa6";
const SidebarRecruitment = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <li>
      <HeadSidebar icon={<FaUserPlus className="w-5 h-5" />} title="Recruitment" openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar}>
        <ul className={`${openSidebar ? "side-menu__sub-open" : ""}`}>
          <SubSidebar title="Identitas" icon={<FaCircleInfo className="w-5 h-5" />} link="/admin/rekrutment/identitas" />
          <SubSidebar title="Lowongan" icon={<FaClipboardList className="w-5 h-5" />} link="/admin/rekrutment/lowongan" />
          {/* <SubSidebar title="Riwayat Karir" icon={<FaClockRotateLeft className="w-5 h-5" />} link="/recruitment/riwayat-karir" />
          <SubSidebar title="Riwayat Pendidikan" icon={<FaUserGraduate className="w-5 h-5" />} link="/recruitment/riwayat-pendidikan" />
          <SubSidebar title="Pertanyaan Personal" icon={<FaPersonCircleQuestion className="w-5 h-5" />} link="/recruitment/pertanyaan-personal" /> */}
        </ul>
      </HeadSidebar>
    </li>
  );
};

export default SidebarRecruitment;
