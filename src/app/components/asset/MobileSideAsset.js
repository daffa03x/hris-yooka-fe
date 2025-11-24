"use client";
import { useState } from "react";
import MobileSub from "../main/MobileSub";
import MobileHead from "../main/MobileHead";
import { FaBoxesStacked, FaBox, FaList, FaCheckDouble, FaClockRotateLeft, FaHammer } from "react-icons/fa6";

const MobileSideAsset = () => {
  const [openSubMobile, setOpenSubMobile] = useState(false);
  const handleOpenSubMobile = () => {
    setOpenSubMobile(!openSubMobile);
  };
  return (
    <li>
      <MobileHead handleOpenSubMobile={handleOpenSubMobile} title="Asset" icon={<FaBoxesStacked className="w-5 h-5" />} />
      <ul className={`${openSubMobile ? "menu__sub-open" : ""}`}>
        <MobileSub title="Kategori Asset" icon={<FaList className="w-5 h-5" />} link="/admin/inventaris/asset-kategori" />
        <MobileSub title="Asset" icon={<FaBox className="w-5 h-5" />} link="/admin/inventaris/asset" />
        <MobileSub title="Peminjaman Asset" icon={<FaCheckDouble className="w-5 h-5" />} link="/admin/inventaris/asset-assignment" />
        <MobileSub title="Riwayat Peminjaman Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link="/admin/inventaris/asset-assignment-history" />
        <MobileSub title="Perbaikan Asset" icon={<FaHammer className="w-5 h-5" />} link="/admin/inventaris/asset-maintenance" />
        <MobileSub title="Riwayat Perbaikan Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link="/admin/inventaris/asset-maintenance-history" />
      </ul>
    </li>
  );
};

export default MobileSideAsset;
