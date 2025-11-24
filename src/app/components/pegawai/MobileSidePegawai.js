"use client";
import { useState } from "react";
import MobileSub from "../main/MobileSub";
import MobileHead from "../main/MobileHead";
import { FaUserCheck, FaCircleInfo, FaUserGraduate, FaFileContract, FaListCheck, FaClipboardList, FaUsers, FaHourglassHalf, FaBuildingFlag } from "react-icons/fa6";

const MobileSidePegawai = () => {
  const [openSubMobile, setOpenSubMobile] = useState(false);
  const handleOpenSubMobile = () => {
    setOpenSubMobile(!openSubMobile);
  };
  return (
    <li>
      <MobileHead handleOpenSubMobile={handleOpenSubMobile} title="Pegawai" icon={<FaUsers className="w-5 h-5" />} />
      <ul className={`${openSubMobile ? "menu__sub-open" : ""}`}>
        <MobileSub title="General" icon={<FaCircleInfo className="w-5 h-5" />} link="/admin/kelola-pegawai/general" />
        <MobileSub title="Kontak Darurat" icon={<FaUserCheck className="w-5 h-5" />} link="/admin/kelola-pegawai/kontak" />
        <MobileSub title="Pendidikan" icon={<FaUserGraduate className="w-5 h-5" />} link="/admin/kelola-pegawai/pendidikan" />
        <MobileSub title="Kontrak" icon={<FaFileContract className="w-5 h-5" />} link="/admin/kelola-pegawai/kontrak" />
        <MobileSub title="Absensi" icon={<FaListCheck className="w-5 h-5" />} link="/admin/kelola-pegawai/absensi" />
        <MobileSub title="Pengajuan" icon={<FaClipboardList className="w-5 h-5" />} link="/admin/kelola-pegawai/pengajuan" />
        <MobileSub title="Cuti Tahunan" icon={<FaHourglassHalf className="w-5 h-5" />} link="/admin/kelola-pegawai/sisa-cuti" />
        <MobileSub title="Hari Nasional" icon={<FaBuildingFlag className="w-5 h-5" />} link="/admin/kelola-pegawai/hari-nasional" />
      </ul>
    </li>
  );
};

export default MobileSidePegawai;
