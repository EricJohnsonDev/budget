import Button from "@mui/material/Button";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | View" },
    { name: "view", content: "View transactions" },
  ];
}

export default function Add() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Button variant="contained" onClick={getData}>
        Get test data
      </Button>
    </main>
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
