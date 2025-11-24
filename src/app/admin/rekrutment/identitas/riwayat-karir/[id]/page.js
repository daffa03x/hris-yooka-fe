"use client";

import AccordionKarir from "@/app/components/recruitment/AccordionKarir";
import Dashboard from "@/app/layouts/AdminDashboard";
import Link from "next/link";
import { useParams } from "next/navigation";

const RiwayatKarir = () => {
  const { id } = useParams();
  return (
    <Dashboard>
      <div className="content">
        <h2 className="intro-y text-lg font-medium mt-10">Data Identitas Riwayat Karir</h2>
        <AccordionKarir id={id} />
        <Link className="btn btn-primary mt-5" href="/admin/rekrutment/identitas">
          Back
        </Link>
      </div>
    </Dashboard>
  );
};

export default RiwayatKarir;
