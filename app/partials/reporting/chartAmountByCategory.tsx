import { PieChart } from "@mui/x-charts";
import type { categoryData } from "../models";
import { formatCentAmount } from "~/utilities/currencyFormat";

interface Props {
  expenses: categoryData[];
}

export default function ChartAmountByCategory({ expenses }: Props) {
  let chartData = [];

  for (var expense of expenses) {
    chartData.push({
      id: crypto.randomUUID(),
      value: expense.amount / 100,
      label: expense.name,
    });
  }

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
    />
  );
}
