import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const GraficoCrecimiento = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold">Crecimiento de Plantas a lo Largo del Tiempo</h3>
      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="altura" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default GraficoCrecimiento;