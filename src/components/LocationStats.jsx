import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LocationStats({ stats }) {
  const cityCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city]++;
    } else acc[item.city] = 1;

    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{width: "70%", height: 300}}>
      <ResponsiveContainer className="mx-0 md:mx-20">
        <LineChart width={700} height={300} data={cities.slice(0, 5)}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{color: "blue"}}/>
          <Legend />
          <Line type="monotone" dataKey="count" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
