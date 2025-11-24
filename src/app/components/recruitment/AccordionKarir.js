"use client";

import { useEffect, useState } from "react";
import Accordion from "../common/Accordion";
import { getIdentitasKarirById } from "@/app/services/recruitmentIdentitas";
import Loading from "../common/Loading";

const AccordionKarir = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getIdentitasKarirById(id);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <Accordion identitas_name={data.nama_lengkap}>
      {data.riwayat_karir && data.riwayat_karir.length > 0 ? (
        data.riwayat_karir.map((item, index) => (
          <div className="p-5" key={index}>
            <div className="accordion accordion-boxed">
              <div className="accordion-item">
                <div className="accordion-header">
                  <button
                    className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => handleAccordion(index)}
                  >
                    Pengalaman ke {index + 1}
                  </button>
                </div>
                {activeIndex === index && (
                  <div className="accordion-collapse collapse show">
                    <div className="accordion-body text-slate-600 dark:text-slate-500 leading-relaxed">
                      <p><strong>Perusahaan:</strong> {item.nama_perusahaan}</p>
                      <p><strong>Posisi:</strong> {item.posisi}</p>
                      <p><strong>Tanggal Masuk:</strong> {item.tanggal_mulai_bekerja}</p>
                      <p><strong>Tanggal Keluar:</strong> {item.tanggal_akhir_bekerja}</p>
                      <p><strong>Jobdesk:</strong> {item.jobdesk}</p>
                      <p><strong>Gaji Awal:</strong>{" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(item.gaji_awal)}
                      </p>
                      <p><strong>Gaji Akhir:</strong>{" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(item.gaji_akhir)}
                      </p>
                      <p><strong>Alasan Berhenti:</strong> {item.alasan_berhenti_bekerja}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="p-5 text-center">Data riwayat karir tidak ditemukan</p>
      )}
    </Accordion>
  );
};

export default AccordionKarir;
