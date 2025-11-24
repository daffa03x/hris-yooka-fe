"use client";
import { useState } from "react";
import HeadSidebar from "../main/HeadSidebar";
import SubSidebar from "../main/SubSidebar";
import { FaBoxesStacked, FaCheckDouble, FaClockRotateLeft } from "react-icons/fa6";

const SidebarUserAsset = ({id}) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <li>
      <HeadSidebar icon={<FaBoxesStacked className="w-5 h-5" />} title="Inventaris" openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar}>
        <ul className={`${openSidebar ? "side-menu__sub-open" : ""}`}>
          <SubSidebar title="Peminjaman Asset" icon={<FaCheckDouble className="w-5 h-5" />} link={`/user/inventaris/asset-assignment/${id}`} />
          <SubSidebar title="Riwayat Peminjaman Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link={`/user/inventaris/asset-assignment-history/${id}`} />
          {/* <SubSidebar title="Perbaikan Asset" icon={<FaHammer className="w-5 h-5" />} link={`/user/inventaris/asset-maintenance/${id}`} /> */}
          {/* <SubSidebar title="Riwayat Perbaikan Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link={`/user/inventaris/asset-maintenance-history/${id}`} /> */}
        </ul>
      </HeadSidebar>
    </li>
  );
};

export default SidebarUserAsset;
