import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const GraficoProporcion = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold">Proporción de Cultivos</h3>
      <PieChart width={400} height={300}>
        <Pie data={data} cx={200} cy={150} innerRadius={60} outerRadius={80} fill="#82ca9d" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? "#0088FE" : "#FF8042"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default GraficoProporcion;