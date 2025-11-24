import { NextResponse } from "next/server";
import { adminMiddleware } from "./middlewares/adminMiddleware"; // Import adminMiddleware

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone(); // Clone URL untuk manipulasi

  // Cek Autentikasi Dasar (Token Ada?)
  if (!token) {
    // Jika tidak ada token dan mencoba mengakses rute terproteksi, redirect ke login
    if (url.pathname.startsWith("/user") || url.pathname.startsWith("/admin")) {
      // console.log("Tidak ada token, redirect ke login.");
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Jika tidak ada token tapi bukan rute terproteksi, lanjutkan (misal ke halaman login/beranda)
    return NextResponse.next();
  }

  // Jika Token Valid, Cek Otorisasi Berdasarkan Peran (misalnya, untuk Admin)
  // Periksa apakah rute yang diakses adalah rute admin
  if (url.pathname.startsWith("/admin")) {
    // console.log("Mengakses rute admin, menjalankan adminMiddleware...");
    return adminMiddleware(req,token); // Teruskan ke adminMiddleware dengan token
  }

  // Jika token valid dan bukan rute admin, lanjutkan ke halaman yang diminta
  // console.log("Token valid, lanjutkan ke halaman.");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*", // Tambahkan rute admin ke matcher utama
    "/profile/:path*",
    // ... rute terproteksi lainnya
  ],
};