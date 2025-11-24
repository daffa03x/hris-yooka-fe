export const sumMasaKerja = (tanggalMulaiStr, tanggalAkhirStr) => {
    if (!tanggalMulaiStr) {
        return 'Belum Ada Data';
    }

    const mulai = new Date(tanggalMulaiStr);
    const akhir = tanggalAkhirStr ? new Date(tanggalAkhirStr) : new Date();

    let tahun = akhir.getFullYear() - mulai.getFullYear();
    let bulan = akhir.getMonth() - mulai.getMonth();
    let hari = akhir.getDate() - mulai.getDate();

    if (hari < 0) {
        bulan--;
        // Menyesuaikan hari dari bulan sebelumnya
        const hariBulanSebelumnya = new Date(akhir.getFullYear(), akhir.getMonth(), 0).getDate();
        hari = hariBulanSebelumnya + hari;
    }

    if (bulan < 0) {
        tahun--;
        bulan = 12 + bulan;
    }
    
    // Format output
    let hasil = '';
    if (tahun > 0) {
        hasil += `${tahun} tahun `;
    }
    if (bulan > 0) {
        hasil += `${bulan} bulan `;
    }
    if (hari > 0) {
        hasil += `${hari} hari`;
    }

    return hasil.trim() || 'Kurang dari 1 hari';
};