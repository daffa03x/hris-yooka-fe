'use client';
import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data dummy untuk persentase absensi
const initialAttendanceData = [
  { name: 'Hadir', value: 85, color: '#82ca9d' }, // Hijau
  { name: 'Tidak Hadir', value: 5, color: '#ffc658' }, // Kuning
  { name: 'Izin', value: 7, color: '#8884d8' }, // Ungu
  { name: 'Sakit', value: 3, color: '#ff7300' }, // Oranye
];

// Data dummy untuk tren absensi bulanan
const monthlyAttendanceData = [
  { month: 'Jan', hadir: 90, tidakHadir: 10 },
  { month: 'Feb', hadir: 88, tidakHadir: 12 },
  { month: 'Mar', hadir: 92, tidakHadir: 8 },
  { month: 'Apr', hadir: 85, tidakHadir: 15 },
  { month: 'Mei', hadir: 95, tidakHadir: 5 },
  { month: 'Jun', hadir: 89, tidakHadir: 11 },
];

const AbsensiChart = () => {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [monthlyData, setMonthlyData] = useState(monthlyAttendanceData);

  // Fungsi untuk menghitung total persentase (harus 100)
  const totalPercentage = attendanceData.reduce((sum, entry) => sum + entry.value, 0);

  // Custom Tooltip untuk Pie Chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <p className="font-bold text-gray-800">{`${payload[0].name}`}</p>
          <p className="text-gray-700">{`Persentase: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip untuk Bar Chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <p className="font-bold text-gray-800">{`Bulan: ${label}`}</p>
          <p className="text-gray-700">{`Hadir: ${payload[0].value}%`}</p>
          <p className="text-gray-700">{`Tidak Hadir: ${payload[1].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
        <>
        <div className="mb-12">
          <div className="flex flex-col items-center justify-center md:flex-row md:space-x-8">
            <div className="w-full h-64 sm:h-80 md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={true} // Aktifkan animasi
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0 hidden md:flex flex-col"> {/* Tambahkan hidden md:flex flex-col */}
              <ul className="list-disc list-inside mt-4 text-gray-700">
                {attendanceData.map((entry, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                    <span className="font-medium">{entry.name}:</span> {entry.value}%
                  </li>
                ))}
              </ul>
              {totalPercentage !== 100 && (
                <p className="text-red-500 mt-4 text-sm">
                  *Total persentase harus 100%. Saat ini: {totalPercentage}%
                </p>
              )}
            </div>
          </div>
          </div>
        <div>
          <div className="w-full h-72 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" className="text-sm sm:text-base" />
                <YAxis className="text-sm sm:text-base" />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend />
                <Bar dataKey="hadir" fill="#82ca9d" name="Hadir (%)" radius={[10, 10, 0, 0]} />
                <Bar dataKey="tidakHadir" fill="#ffc658" name="Tidak Hadir (%)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
  );
};

export default AbsensiChart;
