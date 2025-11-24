'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Data dummy informasi pribadi karyawan
const employeePersonalInfo = {
  employeeId: 'EMP00123',
  fullName: 'Fajrian Nur Adnan',
  jobTitle: 'Software Engineer',
  department: 'Technology',
  email: 'fajrian.adnan@example.com',
  phoneNumber: '+6281234567890',
  address: 'Jl. Contoh No. 123, Bandung, Jawa Barat',
  hiringDate: '2022-03-15',
  contractType: 'Full-time',
  emergencyContact: {
    name: 'Siti Rahayu',
    relationship: 'Ibu',
    phone: '+6281298765432',
  },
  leaveBalance: [
    { name: 'Sisa Cuti Tahunan', value: 10, color: '#4CAF50' }, // Hijau
    { name: 'Cuti Terpakai', value: 5, color: '#FFC107' }, // Kuning
    { name: 'Total Kuota Cuti', value: 15, color: '#F44336' }, // Merah (ini hanya untuk label total, tidak ditampilkan di pie)
  ],
};

const UserChart = () => {
  // Data untuk Pie Chart Cuti (hanya sisa dan terpakai)
  const leaveChartData = employeePersonalInfo.leaveBalance.slice(0, 2);

  // Custom Tooltip untuk Pie Chart Cuti
  const CustomLeaveTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <p className="font-bold text-gray-800">{`${payload[0].name}`}</p>
          <p className="text-gray-700">{`Jumlah Hari: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8">
          Informasi Pribadi Karyawan
        </h1>

        {/* Bagian Informasi Umum */}
        <div className="mb-8 p-4 border rounded-lg bg-blue-50 border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Informasi Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Nama Lengkap:</strong> {employeePersonalInfo.fullName}</p>
            <p><strong>ID Karyawan:</strong> {employeePersonalInfo.employeeId}</p>
            <p><strong>Jabatan:</strong> {employeePersonalInfo.jobTitle}</p>
            <p><strong>Departemen:</strong> {employeePersonalInfo.department}</p>
            <p><strong>Tanggal Bergabung:</strong> {employeePersonalInfo.hiringDate}</p>
            <p><strong>Tipe Kontrak:</strong> {employeePersonalInfo.contractType}</p>
          </div>
        </div>

        {/* Bagian Informasi Kontak */}
        <div className="mb-8 p-4 border rounded-lg bg-green-50 border-green-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Informasi Kontak</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Email:</strong> {employeePersonalInfo.email}</p>
            <p><strong>Nomor Telepon:</strong> {employeePersonalInfo.phoneNumber}</p>
            <p><strong>Alamat:</strong> {employeePersonalInfo.address}</p>
          </div>
        </div>

        {/* Bagian Kontak Darurat */}
        <div className="mb-8 p-4 border rounded-lg bg-red-50 border-red-200">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">Kontak Darurat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Nama:</strong> {employeePersonalInfo.emergencyContact.name}</p>
            <p><strong>Hubungan:</strong> {employeePersonalInfo.emergencyContact.relationship}</p>
            <p><strong>Telepon:</strong> {employeePersonalInfo.emergencyContact.phone}</p>
          </div>
        </div>

        {/* Bagian Sisa Cuti (dengan Doughnut Chart kecil) */}
        <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4 text-center md:text-left">
            Ringkasan Cuti
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <div className="w-full md:w-1/2 h-48 sm:h-56"> {/* Ukuran chart lebih kecil */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={true}
                    labelLine={false}
                  >
                    {leaveChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomLeaveTooltip />} />
                  {/* Legend disembunyikan jika hanya 2 kategori untuk Pie kecil */}
                  {/* <Legend /> */}
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <ul className="list-disc list-inside text-gray-700">
                {employeePersonalInfo.leaveBalance.map((item, index) => (
                  <li key={index} className="flex items-center mb-1">
                    {item.color && (
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    )}
                    <span className="font-medium">{item.name}:</span> {item.value} Hari
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Lihat detail cuti Anda di halaman Cuti & Kehadiran.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>*Data ini adalah data dummy untuk demonstrasi.</p>
        </div>
      </div>
    </div>
  );
};

export default UserChart;
