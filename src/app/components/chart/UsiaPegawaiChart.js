'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data dummy untuk distribusi usia karyawan (sebagai histogram)
// Ini adalah "bin" atau kelompok usia dan jumlah karyawan di setiap kelompok
const ageDistributionData = [
  { ageGroup: '18-25', count: 45, color: '#8884d8' },
  { ageGroup: '26-30', count: 80, color: '#82ca9d' },
  { ageGroup: '31-35', count: 70, color: '#ffc658' },
  { ageGroup: '36-40', count: 60, color: '#ff7300' },
  { ageGroup: '41-45', count: 35, color: '#a4de6c' },
  { ageGroup: '46-50', count: 20, color: '#d0ed57' },
  { ageGroup: '51-55', count: 10, color: '#f7b731' },
  { ageGroup: '56+', count: 5, color: '#eb5757' },
];

const UsiaPegawaiChart = () => {
  // Custom Tooltip untuk Bar Chart (Histogram)
  const CustomAgeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <p className="font-bold text-gray-800">{`Kelompok Usia: ${label}`}</p>
          <p className="text-gray-700">{`Jumlah Karyawan: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ageDistributionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="ageGroup" label={{ value: 'Kelompok Usia', position: 'insideBottom', offset: -5 }} className="text-sm sm:text-base" />
              <YAxis label={{ value: 'Jumlah Pegawai', angle: -90, position: 'insideLeft' }} className="text-sm sm:text-base" />
              <Tooltip content={<CustomAgeTooltip />} />
                <Legend verticalAlign="top" align="center" height={50} />
              <Bar dataKey="count" name="Jumlah Pegawai" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
  );
};

export default UsiaPegawaiChart;
