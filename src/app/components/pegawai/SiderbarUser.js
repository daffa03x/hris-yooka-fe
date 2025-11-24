"use client";
import { useState } from "react";
import HeadSidebar from "../main/HeadSidebar";
import SubSidebar from "../main/SubSidebar";
import { FaUserCheck, FaUser, FaCircleInfo, FaUserGraduate, FaFileContract, FaListCheck, FaClipboardList } from "react-icons/fa6";

const SidebarUser = ({id}) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <li>
      <HeadSidebar icon={<FaUser className="w-5 h-5" />} title="Pegawai" openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar}>
        <ul className={`${openSidebar ? "side-menu__sub-open" : ""}`}>
          <SubSidebar title="General" icon={<FaCircleInfo className="w-5 h-5" />} link={`/user/pegawai/general/${id}`} />
          <SubSidebar title="Kontak Darurat" icon={<FaUserCheck className="w-5 h-5" />} link={`/user/pegawai/kontak/${id}`} />
          <SubSidebar title="Pendidikan" icon={<FaUserGraduate className="w-5 h-5" />} link={`/user/pegawai/pendidikan/${id}`} />
          <SubSidebar title="Kontrak" icon={<FaFileContract className="w-5 h-5" />} link={`/user/pegawai/kontrak/${id}`} />
          <SubSidebar title="Absensi" icon={<FaListCheck className="w-5 h-5" />} link={`/user/pegawai/absensi/${id}`} />
          <SubSidebar title="Pengajuan" icon={<FaClipboardList className="w-5 h-5" />} link={`/user/pegawai/pengajuan/${id}`} />
        </ul>
      </HeadSidebar>
    </li>
  );
};

export default SidebarUser;
