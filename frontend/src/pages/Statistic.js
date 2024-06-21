import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Thống kê doanh thu",
    },
  },
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Thống kê nguoi dung",
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const labels = ["Ko", "DD", "dd"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Data type",
      data: [100, 200, 300],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Statistic = () => {
  const [value, setValue] = useState("Revenue");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <select name="type" value={value} onChange={handleChange}>
        <option value="Revenue">Revenue</option>
        <option value="User">User</option>
      </select>
      
      {value==="Revenue"&&
      <Line options={options1} data={data} />}

      {value==="User" &&
      <Line options={options2} data={data} />}
    </div>
  );
};

export default Statistic;
