"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const MobileSub = ({ link, icon, title }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Ambil URL saat ini

  const isActive = pathname === link; // Cek apakah link sama dengan URL saat ini

  const handleClick = (e) => {
    if (isActive) return; // Jika sudah di halaman yang sama, tidak perlu navigasi
    e.preventDefault();
    setLoading(true);
    router.push(link);
  };

  useEffect(() => {
    const handleRouteChange = () => setLoading(false);
    router.events?.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);
  return (
    <li>
      {loading ? (
        <button className="menu" disabled>
          Loading...
        </button>
      ) : (
        <Link href={link} className="menu" onClick={handleClick}>
          <div className="menu__icon">{icon}</div>
          <div className="menu__title"> {title} </div>
        </Link>
      )}
    </li>
  );
};

export default MobileSub;
