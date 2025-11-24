"use client";
import { useState } from "react";
import MobileSub from "../main/MobileSub";
import MobileHead from "../main/MobileHead";
import { FaBoxesStacked, FaCheckDouble, FaClockRotateLeft, FaHammer } from "react-icons/fa6";

const MobileSideUserAsset = ({id}) => {
  const [openSubMobile, setOpenSubMobile] = useState(false);
  const handleOpenSubMobile = () => {
    setOpenSubMobile(!openSubMobile);
  };
  return (
    <li>
      <MobileHead handleOpenSubMobile={handleOpenSubMobile} title="Asset" icon={<FaBoxesStacked className="w-5 h-5" />} />
      <ul className={`${openSubMobile ? "menu__sub-open" : ""}`}>
        <MobileSub title="Peminjaman Asset" icon={<FaCheckDouble className="w-5 h-5" />} link={`/user/inventaris/asset-assignment/${id}`} />
        <MobileSub title="Riwayat Peminjaman Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link={`/user/inventaris/asset-assignment-history/${id}`} />
        <MobileSub title="Perbaikan Asset" icon={<FaHammer className="w-5 h-5" />} link={`/user/inventaris/asset-maintenance/${id}`} />
        <MobileSub title="Riwayat Perbaikan Asset" icon={<FaClockRotateLeft className="w-5 h-5" />} link={`/user/inventaris/asset-maintenance-history/${id}`} />
      </ul>
    </li>
  );
};

export default MobileSideUserAsset;
