'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

const TopBar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const fetchUser = () => {
      try {
        const response = localStorage.getItem("pegawai");
        if (response) {
          const parsedData = JSON.parse(response);
          setData(parsedData);
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
      } finally {
        setLoading(false); // Matikan loading setelah data diproses (baik berhasil atau gagal)
      }
    };
    fetchUser();
  }, []);

  // Rendera secara kondisional
  if (loading) {
    // Tampilkan sesuatu saat memuat, atau kembalikan null untuk tidak menampilkan apa pun
    return null; 
  }

  // Jika data tidak ada setelah dimuat, kembalikan null atau tampilan kosong
  if (!data) {
    return null; 
  }

  return (
    <div className="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
      <div className="h-full flex items-center">
        <a href="" className="-intro-x hidden md:flex">
          <Image
            width={50}
            height={50}
            alt="Midone - HTML Admin Template"
            className="w-24"
            src="/logo_yooka.png"
          />
        </a>
        <nav aria-label="breadcrumb" className="-intro-x h-full mr-auto">
          <ol className="breadcrumb breadcrumb-light">
          </ol>
        </nav>
        <div className="intro-x relative mr-3 sm:mr-6">
          {/* Tambahkan optional chaining untuk mencegah error jika users atau name tidak ada */}
          <p className="text-white text-lg">{data.pegawai?.users?.name}</p>
        </div>
        <div className="intro-x dropdown w-8 h-8">
          <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" role="button" aria-expanded="false" data-tw-toggle="dropdown">
            {/* Periksa apakah avatar ada sebelum merender */}
            {data.pegawai?.users?.avatar ? (
              <Image 
                alt="Midone - HTML Admin Template" 
                src={`https://api.yooka.id/${data.pegawai.users.avatar}`} 
                width={40} 
                height={40} 
              />
            ) : (
              <Image 
                alt="Midone - HTML Admin Template" 
                src="/avatar-head.jpg" 
                width={40} 
                height={40} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;