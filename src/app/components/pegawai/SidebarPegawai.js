"use client";
import { useState } from "react";
import HeadSidebar from "../main/HeadSidebar";
import SubSidebar from "../main/SubSidebar";
import { FaUserCheck, FaUsers, FaCircleInfo, FaUserGraduate, FaFileContract, FaListCheck, FaClipboardList, FaHourglassHalf, FaBuildingFlag } from "react-icons/fa6";
const SidebarPegawai = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <li>
      <HeadSidebar icon={<FaUsers className="w-5 h-5" />} title="Pegawai" openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar}>
        <ul className={`${openSidebar ? "side-menu__sub-open" : ""}`}>
          <SubSidebar title="General" icon={<FaCircleInfo className="w-5 h-5" />} link="/admin/kelola-pegawai/general" />
          <SubSidebar title="Kontak Darurat" icon={<FaUserCheck className="w-5 h-5" />} link="/admin/kelola-pegawai/kontak" />
          <SubSidebar title="Pendidikan" icon={<FaUserGraduate className="w-5 h-5" />} link="/admin/kelola-pegawai/pendidikan" />
          <SubSidebar title="Kontrak" icon={<FaFileContract className="w-5 h-5" />} link="/admin/kelola-pegawai/kontrak" />
          <SubSidebar title="Absensi" icon={<FaListCheck className="w-5 h-5" />} link="/admin/kelola-pegawai/absensi" />
          <SubSidebar title="Pengajuan" icon={<FaClipboardList className="w-5 h-5" />} link="/admin/kelola-pegawai/pengajuan" />
          <SubSidebar title="Cuti Tahunan" icon={<FaHourglassHalf className="w-5 h-5" />} link="/admin/kelola-pegawai/sisa-cuti" />
          <SubSidebar title="Hari Nasional" icon={<FaBuildingFlag className="w-5 h-5" />} link="/admin/kelola-pegawai/hari-nasional" />
        </ul>
      </HeadSidebar>
    </li>
  );
};

export default SidebarPegawai;
