import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { RoutePrice } from "../../../api/models/price-watch/pricewatch";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      // display: true,
      text: "Price prediction",
    },
  },
};

interface Props {
  prices: RoutePrice[];
}

export function BarChart({ prices }: Props) {
  const labels = prices.map(
    (el) => `${el.origin}-${el.destination.split(",")[0]}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices.map((el) => el.price.toFixed(2)),
        backgroundColor: "rgba(232, 65, 24,0.7)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
