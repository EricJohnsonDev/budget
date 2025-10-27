import type { Route } from "./+types/home";
import * as React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import type { Tx_expenses } from "~/partials/models";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | Budget" },
    { name: "home", content: "EDJ Dev Budget homepage" },
  ];
}

export default function Home() {
  const [sumExpenses, setSumExpenses] = React.useState(0);

  const updateData = async (formData: FormData) => {
    const params = new URLSearchParams();
    params.append("start", formData.get("startDate") as string);
    params.append("end", formData.get("endDate") as string);

    const url = `http://localhost:8080/expense/date?${params}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      refreshDashboard(json);
    } catch (error) {
      console.error(error);
    }
  };

  const calcSumExpenses = (expensesIn: Tx_expenses[]) => {
    let result = 0;

    for (let i = 0; i < expensesIn.length; i++) {
      let amount = parseFloat(formatAmount(expensesIn[i].Amount));
      result += amount;
    }

    setSumExpenses(result);
  };

  const formatAmount = (amount: string) => {
    let formattedAmount = amount
      .replace(")", "")
      .replace("(", "-")
      .replace("$", "")
      .replace(",", "");

    return formattedAmount;
  };

  const refreshDashboard = (expensesIn: Tx_expenses[]) => {
    calcSumExpenses(expensesIn);
  };

  return (
    <Box>
      <h1>Dashboard</h1>
      <form action={updateData}>
        <TextField
          name="startDate"
          label="Start Date"
          helperText="MM-dd-yyyy"
        ></TextField>
        <TextField
          name="endDate"
          label="End Date"
          helperText="MM-dd-yyyy"
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          className="h-16"
          startIcon={<RefreshIcon />}
        ></Button>
      </form>
      <p>Total Expenses: {sumExpenses}</p>
    </Box>
  );
}
