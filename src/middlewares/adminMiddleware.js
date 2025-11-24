import { NextResponse } from "next/server";
import { getUserToken } from "@/app/utils/user";

export async function adminMiddleware(req,token) {
  const url = req.nextUrl.clone();
  // Dapatkan peran pengguna dari token
  const userRole = await getUserToken(token); // Gunakan token yang sudah divalidasi dari middleware utama
    // console.log(userRole);
  // Jika peran bukan 'admin', redirect ke halaman tidak diizinkan atau beranda
  if (userRole.user.role !== "admin") {
    // console.log(`Pengguna dengan peran '${userRole}' mencoba mengakses rute admin. Redirect.`);
    // Anda bisa mengarahkan ke halaman 403 (Forbidden) atau halaman beranda
    return NextResponse.redirect(new URL("/error/403", req.url));
  }

  // Jika peran adalah 'admin', lanjutkan
  // console.log("Pengguna adalah admin, lanjutkan.");
  return NextResponse.next();
}