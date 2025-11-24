"use client";
import { useState, useEffect, useRef } from "react";
import { getAbsensiToday, storeAbsensiToday } from "../services/absensiToday";
import { toast, Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";

const AbsensiToday = () => {
  const [absensi, setAbsensi] = useState([]);
  const [idCard, setIdCard] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [inputTimeout, setInputTimeout] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [statusMessage, setstatusMessage] = useState("");
  const inputRef = useRef(null);

  const handleToastSuccess = (message) => {
    toast.success(message, {
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

  const handleToastError = (message) => {
    toast.error(message, {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    setCurrentTime(
      new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAbsensi = async () => {
      const dataAbsensi = await getAbsensiToday();
      console.log("ini di useEffect : ");
      console.log(dataAbsensi);
      setAbsensi(dataAbsensi);
    };
    fetchAbsensi();
  }, []);

  useEffect(() => {
    const keepFocus = setInterval(() => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);

    return () => clearInterval(keepFocus);
  }, []);

  // Cleanup timeout when component unmounts
  useEffect(() => {
    return () => {
      if (inputTimeout) {
        clearTimeout(inputTimeout);
      }
    };
  }, [inputTimeout]);

  useEffect(() => {
    const message = localStorage.getItem("message");
    const status = localStorage.getItem("status");
    if (message) {
      localStorage.removeItem("message");
      localStorage.removeItem("status");
      // Set hanya jika pesan berbeda
      setToastMessage((prev) => (prev !== message ? message : prev));
      setstatusMessage((prev) => (prev !== status ? status : prev));
    }
  }, []);

  useEffect(() => {
    if (statusMessage === "200") {
      handleToastSuccess(toastMessage);
    } else if (statusMessage === "202" || statusMessage === "203") {
      handleToastError(toastMessage);
    }
  }, [toastMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchAbsensi = async () => {
        const dataAbsensi = await getAbsensiToday();
        console.log("Fetch otomatis setiap 5 menit:");
        console.log(dataAbsensi);
        setAbsensi(dataAbsensi);
      };
      fetchAbsensi();
    }, 300000); // 300000 ms = 5 menit

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    console.log("Received input:", value);
    setIdCard(value);

    // Clear any existing timeout
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }

    // Set new timeout
    const newTimeout = setTimeout(() => {
      if (value.length >= 10) {
        // Sesuaikan dengan panjang ID card Anda
        handleSubmit(null, value); // Kirim value langsung
      }
    }, 100);

    setInputTimeout(newTimeout);
  };

  const handleSubmit = async (e, currentValue) => {
    if (e) e.preventDefault();
    const valueToSubmit = currentValue || idCard; // Gunakan value yang dikirim atau idCard state
    console.log("Submitting with value:", valueToSubmit);

    try {
      const response = await storeAbsensiToday(valueToSubmit);
      localStorage.setItem("message", response.data.message);
      localStorage.setItem("status", response.status);
      if (response.status === 200) {
        handleToastSuccess(response.data.message);
        console.log("Response:", response);
        setIdCard("");

        // Refresh data after submit
        const dataAbsensi = await getAbsensiToday();
        setAbsensi(dataAbsensi);
      } else {
        setIdCard("");
        handleToastError(response.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={styles.container} className="h-screen">
      <ToastContainer />
      <div style={styles.leftContainer}>
        <h2 style={styles.currentTimeTitle}>Jam Sekarang</h2>
        <p style={styles.currentTime}>{currentTime}</p>
      </div>
      <input ref={inputRef} value={idCard} onChange={handleInputChange} name="id_card" id="id_card" type="text" style={{ position: "fixed", top: 0, left: 0, opacity: 0, width: "10px" }} autoFocus />
      <div style={styles.rightContainer}>
        <h1 style={styles.title}>Absensi</h1>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableHeaderCell}>Pegawai</th>
                <th style={styles.tableHeaderCell}>Jam Masuk</th>
                <th style={styles.tableHeaderCell}>Jam Pulang</th>
              </tr>
            </thead>
            <tbody>
              {absensi.status !== 200 || !absensi.data.data.length ? (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      fontSize: "48px",
                      fontWeight: "bold",
                      height: "200px",
                      verticalAlign: "middle",
                    }}>
                    Belum ada absen
                  </td>
                </tr>
              ) : (
                absensi.data.data.map((absen, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                    <td style={styles.tableCell}>
                      {absen.pegawais.users.name} <br />
                      <span>{absen.pegawais.nip}</span>
                    </td>
                    <td style={styles.tableCell}>{absen.jam_masuk}</td>
                    <td style={styles.tableCell}>{absen.jam_pulang}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style>
        {`
          body {
            background-color: #f5f5f5 !important;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    padding: "20px",
    fontFamily: "Poppins ,sans-serif",
  },
  leftContainer: {
    flex: 1,
    paddingRight: "20px",
    textAlign: "center",
    borderRight: "2px solid #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 3,
    paddingLeft: "20px",
  },
  currentTimeTitle: {
    fontSize: "32px",
    marginBottom: "30px",
  },
  currentTime: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
    color: "#333",
  },
  tableContainer: {
    maxHeight: "90%",
    overflowY: "auto",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "0 auto",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "white",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  tableHeaderCell: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
  },
  tableRowEven: {
    backgroundColor: "#f9f9f9",
    transition: "background-color 0.3s ease",
  },
  tableRowOdd: {
    backgroundColor: "#ffffff",
    transition: "background-color 0.3s ease",
  },
  tableRow: {
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
    color: "#555",
    borderBottom: "1px solid #ddd",
  },
  tableRowHover: {
    backgroundColor: "#e1e1e1",
  },
};

export default AbsensiToday;
