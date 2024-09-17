import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LotteryChart = () => {
  const data = {
    labels: ['1', '2', '3', '4'], // Sorteos
    datasets: [
      {
        label: 'Primario',
        data: [10, 14, 6, 8],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Secundario',
        data: [5, 5.6, 3, 4.5],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Reserva',
        data: [1.2, 2, 2.2, 3],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Cantidad de Tickets',
        data: [8, 12, 4, 6],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Resultados de Sorteos',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sorteos'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Valores'
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default LotteryChart;
