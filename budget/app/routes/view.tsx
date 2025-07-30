import * as React from "react";
import Button from "@mui/material/Button";
import type { Route } from "./+types/home";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  SearchFilter,
  DateFilter,
  CategoryFilter,
  AmountFilter,
} from "~/partials/filters";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | View" },
    { name: "view", content: "View transactions" },
  ];
}

export default function View() {
  const [filters, setFilters] = React.useState(["date"]);

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string[],
  ) => {
    if (newFilter?.length !== 0) {
      setFilters(newFilter);
    }
  };

  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        color="primary"
        value={filters}
        onChange={handleFilter}
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

      <DateFilter visible={filters.includes("date")} />
      <CategoryFilter visible={filters.includes("category")} />
      <AmountFilter visible={filters.includes("amount")} />
      <SearchFilter visible={filters.includes("search")} />

      <Button variant="contained" onClick={getData}>
        Get test data
      </Button>
    </Stack>
  );
}

async function getData() {
  const params = new URLSearchParams();
  params.append("start", "01-01-2000");
  params.append("end", "01-02-2000");

  const url = `http://localhost:8080/expense/date?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}
