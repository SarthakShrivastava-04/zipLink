import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DeviceInfo({ stats }) {
  const deviceCount = stats.reduce((acc, item) => {
    if (acc[item.device]) {
      acc[item.device]++;
    } else acc[item.device] = 1;

    return acc;
  }, {});

  const devices = Object.entries(deviceCount).map(([device, count]) => ({
    device,
    count,
  }));

  return (
    <div style={{ width: "70%", height: 300 }}>
      <ResponsiveContainer className="mx-0 md:mx-28">
        <PieChart width={700} height={400}>
          <Pie
            data={devices}
            dataKey="count"
            labelLine={false}
            label = {({device, percent}) => `${device}: ${(percent * 100).toFixed(0)}%`}
          >
            {devices.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
