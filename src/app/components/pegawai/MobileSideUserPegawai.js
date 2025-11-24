"use client";
import { useState } from "react";
import MobileSub from "../main/MobileSub";
import MobileHead from "../main/MobileHead";
import { FaUserCheck, FaCircleInfo, FaUserGraduate, FaFileContract, FaListCheck, FaClipboardList, FaUser } from "react-icons/fa6";

const MobileSideUserPegawai = ({id}) => {
  const [openSubMobile, setOpenSubMobile] = useState(false);
  const handleOpenSubMobile = () => {
    setOpenSubMobile(!openSubMobile);
  };
  return (
    <li>
      <MobileHead handleOpenSubMobile={handleOpenSubMobile} title="Pegawai" icon={<FaUser className="w-5 h-5" />} />
      <ul className={`${openSubMobile ? "menu__sub-open" : ""}`}>
        <MobileSub title="General" icon={<FaCircleInfo className="w-5 h-5" />} link={`/user/pegawai/general/${id}`} />
        <MobileSub title="Kontak Darurat" icon={<FaUserCheck className="w-5 h-5" />} link={`/user/pegawai/kontak/${id}`} />
        <MobileSub title="Pendidikan" icon={<FaUserGraduate className="w-5 h-5" />} link={`/user/pegawai/pendidikan/${id}`} />
        <MobileSub title="Kontrak" icon={<FaFileContract className="w-5 h-5" />} link={`/user/pegawai/kontrak/${id}`} />
        <MobileSub title="Absensi" icon={<FaListCheck className="w-5 h-5" />} link={`/user/pegawai/absensi/${id}`} />
        <MobileSub title="Pengajuan" icon={<FaClipboardList className="w-5 h-5" />} link={`/user/pegawai/pengajuan/${id}`} />
      </ul>
    </li>
  );
};

export default MobileSideUserPegawai;
