import Button from "@mui/material/Button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | Add" },
    { name: "add", content: "Add transactions" },
  ];
}

export default function Add() {
  return (
    <Button variant="contained" onClick={addData}>
      Add test data
    </Button>
  );
}

async function addData() {
  const url = `http://localhost:8080/expense/add`;

  let testExpense = [
    {
      Date: "01-01-2000",
      Amount: "$666",
      Institution: "First National Test",
      Category: "Other",
      Comment: "Test",
    },
  ];

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(testExpense),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}
