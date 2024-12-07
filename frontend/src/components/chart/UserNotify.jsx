import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserNotify = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    const fetchSalesData = async () => {
      // Replace this with an actual API call to get sales data
      const data = [
        { employee: "John Doe", sales: 1500 },
        { employee: "Jane Smith", sales: 2200 },
        { employee: "Alice Brown", sales: 1800 },
        { employee: "Bob Johnson", sales: 1600 },
      ];
      setSalesData(data);
    };
    fetchSalesData();
  }, []);

  // Prepare chart data
  const data = {
    labels: salesData.map(item => item.employee),
    datasets: [
      {
        label: 'Sales by Employee',
        data: salesData.map(item => item.sales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales by Employee',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Sales: $${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Employee Sales Performance</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserNotify;
