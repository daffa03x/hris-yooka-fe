'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data dummy untuk distribusi jenis kelamin
const genderDistributionData = [
  { name: 'Pria', value: 60, color: '#3b82f6' }, // Biru
  { name: 'Wanita', value: 40, color: '#ec4899' }, // Pink
];

const GenderChart = () => {
  // Custom Tooltip untuk Doughnut Chart
  const CustomGenderTooltip = ({ active, payload }) => {
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

  return (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%" // Membuat Doughnut Chart
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={true}
                  labelLine={false} // Sembunyikan garis label
                >
                  {genderDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomGenderTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
  );
};

export default GenderChart;
