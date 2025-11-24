'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Data dummy untuk rata-rata masa kerja (dalam tahun)
const averageTenureData = [
  { department: 'IT', avgTenure: 5.2, color: '#8884d8' },
  { department: 'HR', avgTenure: 7.1, color: '#82ca9d' },
  { department: 'Marketing', avgTenure: 4.8, color: '#ffc658' },
  { department: 'Finance', avgTenure: 6.5, color: '#ff7300' },
  { department: 'Sales', avgTenure: 3.9, color: '#a4de6c' },
  { department: 'Operations', avgTenure: 5.8, color: '#d0ed57' },
];

const MasaKerjaChart = () => { // Nama komponen diubah menjadi MasaKerjaChart
  // Custom Tooltip untuk Bar Chart
  const CustomTenureTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <p className="font-bold text-gray-800">{`Departemen: ${label}`}</p>
          <p className="text-gray-700">{`Rata-rata Masa Kerja: ${payload[0].value} Tahun`}</p>
        </div>
      );
    }
    return null;
  };

  return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={averageTenureData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="department" className="text-sm sm:text-base" />
              <YAxis
                label={{ value: 'Tahun', angle: -90, position: 'insideLeft', className: 'text-sm sm:text-base' }}
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTenureTooltip />} />
              <Legend />
              <Bar dataKey="avgTenure" name="Rata-rata Masa Kerja (Tahun)" radius={[10, 10, 0, 0]}>
                {averageTenureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
  );
};

export default MasaKerjaChart; // Export komponen dengan nama yang sesuai
