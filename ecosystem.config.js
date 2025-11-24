// ecosystem.config.js
module.exports = {
  apps : [{
    name: "yooka", // Ganti dengan nama aplikasi Anda yang spesifik
    script: "npm",
    args: "start",
    env: {
      NODE_ENV: "production",
      PORT: 3000, // Port yang akan digunakan Next.js
      // Tambahkan variabel lingkungan lainnya jika diperlukan, contoh:
      // NEXT_PUBLIC_API_URL: "https://api.yooka.id"
    }
  }]
};
