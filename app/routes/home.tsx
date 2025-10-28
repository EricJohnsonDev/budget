import type { Route } from "./+types/home";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { Tx_expenses } from "~/partials/models";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Icon from "@mui/material/Icon";
import {
  SearchFilter,
  DateFilter,
  CategoryFilter,
  AmountFilter,
} from "~/partials/filters";
import ViewTable from "~/partials/txtable";
import Dashboard from "~/partials/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | Budget" },
    { name: "home", content: "EDJ Dev Budget homepage" },
  ];
}

export default function Home() {
  const [sumExpenses, setSumExpenses] = React.useState(0);
  const [searchFilters, setSearchFilters] = React.useState(["date"]);
  const [viewFilters, setViewFilters] = React.useState(["dashboard"]);
  const [rows, setRows] = React.useState<Tx_expenses[]>([]);

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
    setRows(expensesIn);
    calcSumExpenses(expensesIn);
  };

  const clearDisplayedData = () => {
    setRows([]);
    calcSumExpenses([]);
  };

  const handleSearchFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string[],
  ) => {
    if (newFilter.length) {
      setSearchFilters(newFilter);
    }
  };

  const handleViewFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string[],
  ) => {
    if (newFilter.length) {
      setViewFilters(newFilter);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <ToggleButtonGroup
          color="primary"
          value={searchFilters}
          onChange={handleSearchFilter}
          aria-label="view filter"
        >
          <ToggleButton value="date" aria-label="date filter">
            Date
          </ToggleButton>
          <ToggleButton value="category" aria-label="category filter">
            Category
          </ToggleButton>
          <ToggleButton value="amount" aria-label="amount filter">
            Amount
          </ToggleButton>
          <ToggleButton value="search" aria-label="search filter">
            Search
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          color="primary"
          exclusive
          value={viewFilters}
          onChange={handleViewFilter}
          aria-label="report style filter"
        >
          <ToggleButton value="dashboard" aria-label="dashboard view filter">
            Dashboard
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view filter">
            Table
          </ToggleButton>
        </ToggleButtonGroup>

        <form
          action={updateData}
          className="relative max-w-4xl rounded-2xl border-2 p-2"
          data-testid="filterForm"
        >
          <DateFilter visible={searchFilters.includes("date")} />
          <CategoryFilter visible={searchFilters.includes("category")} />
          <AmountFilter visible={searchFilters.includes("amount")} />
          <SearchFilter visible={searchFilters.includes("search")} />

          <Button
            hidden={rows && rows.length === 0}
            onClick={() => clearDisplayedData()}
          >
            <Icon>clear</Icon>
            Clear results
          </Button>

          <Button
            type="submit"
            className="!absolute top-2 right-2 h-14"
            variant="contained"
            data-testid="searchButton"
          >
            <Icon>search</Icon>
          </Button>
        </form>
        {rows && rows.length > 0 && (
          <ViewTable
            visible={viewFilters.includes("table")}
            rows={rows}
          ></ViewTable>
        )}
        {rows && rows.length > 0 && (
          <Dashboard visible={viewFilters.includes("dashboard")}></Dashboard>
        )}
      </Stack>
    </Box>
  );
}
