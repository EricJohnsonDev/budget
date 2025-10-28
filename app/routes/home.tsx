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
  const [searchFilters, setSearchFilters] = React.useState(["date"]);
  const [viewFilters, setViewFilters] = React.useState(["dashboard"]);
  const [rows, setRows] = React.useState<Tx_expenses[]>([]);

const submitFormTest = async () => {
    const formData = new FormData(document.getElementById('filterForm') as HTMLFormElement);
    const params = new URLSearchParams();
    params.append("start", formData.get("startDate") as string);
    params.append("end", formData.get("endDate") as string);

    const url = `http://localhost:8080/expense/date?${params}`;

    fetch(url).then(async response => {
      const json = await response.json();
      refreshDashboard(json);
    });
};

  const refreshDashboard = (expensesIn: Tx_expenses[]) => {
    setRows(expensesIn);
  };

  const clearDisplayedData = () => {
    (document.getElementById('filterForm') as HTMLFormElement).reset();
    setRows([]);
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
          className="relative max-w-4xl rounded-2xl border-2 p-2"
          id="filterForm"
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
            onClick={() => submitFormTest()}
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
          <Dashboard
            visible={viewFilters.includes("dashboard")}
            rows={rows}
          ></Dashboard>
        )}
      </Stack>
    </Box>
  );
}
