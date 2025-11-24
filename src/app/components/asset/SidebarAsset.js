"use client";
import { useState } from "react";
import HeadSidebar from "../main/HeadSidebar";
import SubSidebar from "../main/SubSidebar";
import { FaBoxesStacked, FaBox, FaList, FaCheckDouble, FaClockRotateLeft, FaHammer } from "react-icons/fa6";

const SidebarAsset = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <li>
      <HeadSidebar icon={<FaBoxesStacked className="w-5 h-5" />} title="Inventaris" openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar}>
        <ul className={`${openSidebar ? "side-menu__sub-open" : ""}`}>
          <SubSidebar title="Kategori Asset" icon={<FaList className="w-5 h-5" />} link="/admin/inventaris/asset-kategori" />
          <SubSidebar title="Asset" icon={<FaBox className="w-5 h-5" />} link="/admin/inventaris/asset" />
          <SubSidebar title="Peminjaman Asset" icon={<FaCheckDouble className="w-5 h-5" />} link="/admin/inventaris/asset-assignment" />
          <SubSidebar title="Riwayat Peminjaman Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link="/admin/inventaris/asset-assignment-history" />
          <SubSidebar title="Perbaikan Asset" icon={<FaHammer className="w-5 h-5" />} link="/admin/inventaris/asset-maintenance" />
          <SubSidebar title="Riwayat Perbaikan Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link="/admin/inventaris/asset-maintenance-history" />
        </ul>
      </HeadSidebar>
    </li>
  );
};

export default SidebarAsset;
