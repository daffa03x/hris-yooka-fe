"use client";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import MobileSidebar from "../components/main/MobileSidebar";
import Sidebar from "../components/main/Sidebar";
import TopBar from "../components/main/TopBar";
import { useRouter } from "next/navigation";
import { removeToken, getToken } from "../utils/token";
import { ToastContainer } from "react-toastify";
import { getPegawaiByToken } from "../services/userPegawai";

const AdminDashboard = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken(); // Ambil token dulu
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const result = await getPegawaiByToken();
        if (!result) {
          removeToken();
          router.push("/");
        } else {
          setUser(result.pegawai.users);
          localStorage.setItem("pegawai", JSON.stringify(result));
        }
      } catch (error) {
        removeToken();
        router.push("/");
      } finally {
        // setLoading(false);
      }
    };

    fetchUser();
  }, [router]); // Dependency array kosong agar hanya dijalankan sekali saat mount

  useEffect(() => {
    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      localStorage.removeItem("successMessage");

      // Set hanya jika pesan berbeda
      setToastMessage((prev) => (prev !== successMessage ? successMessage : prev));
    }
  }, []);

  useEffect(() => {
    if (toastMessage) {
      handleToast(toastMessage);
    }
  }, [toastMessage]);
  const handleToast = (successMessage) => {
    toast.success(successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // if (loading) {
  //   return (
  //     <>
  //       <div className="loading-dots-container">
  //         <div className="loading-dot"></div>
  //         <div className="loading-dot"></div>
  //         <div className="loading-dot"></div>
  //       </div>
  //       <style>{`
  //         body {
  //           background-color: #f5f5f5 !important;
  //           margin: 0;
  //           padding: 0;
  //         }

  //         .loading-dots-container {
  //           display: flex;
  //           justify-content: center;
  //           align-items: center;
  //           min-height: 100vh;
  //           background-color: #f5f5f5;
  //         }

  //         .loading-dot {
  //           width: 20px;
  //           height: 20px;
  //           margin: 0 5px;
  //           background-color: #3498db;
  //           border-radius: 50%;
  //           animation: bounce 1.2s infinite ease-in-out;
  //         }

  //         .loading-dot:nth-child(1) {
  //           animation-delay: -0.32s;
  //         }
  //         .loading-dot:nth-child(2) {
  //           animation-delay: -0.16s;
  //         }

  //         @keyframes bounce {
  //           0%,
  //           80%,
  //           100% {
  //             transform: scale(0);
  //           }
  //           40% {
  //             transform: scale(1);
  //           }
  //         }
  //       `}</style>
  //     </>
  //   );
  // }

  return (
    <div className="main">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <MobileSidebar 
        user={user}
        link_profile={`/profile/${user?.id}`}
        link_ubah_password={`/profile/update-password/${user?.id}`}
      />
      <TopBar />
      <div className="wrapper">
        <div className="wrapper-box">
          <Sidebar
            user={user}
            link_profile={`/profile/${user?.id}`}
            link_ubah_password={`/profile/update-password/${user?.id}`}
          />
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
