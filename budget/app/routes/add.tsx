import * as React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | Add" },
    { name: "add", content: "Add transactions" },
  ];
}

export default function Add() {
  return (
    <form action={addData}>
      <Button type="submit" variant="contained">
        Add transaction(s)
      </Button>
      <section>
        <TextField name="Date" label="Date" helperText="MM-dd-yyyy"></TextField>
        <TextField name="Amount" label="Amount" helperText="$USD"></TextField>
        <TextField
          name="Institution"
          label="Institution"
          helperText=" "
        ></TextField>
        <TextField name="Category" label="Category" helperText=" "></TextField>
        <TextField
          name="Subcategory"
          label="Subcategory"
          helperText=" "
        ></TextField>
        <TextField name="Comment" label="Comment" helperText=" "></TextField>
      </section>
    </form>
  );
}

async function addData(formData: FormData) {
  const url = `http://localhost:8080/expense/add`;
  const expenses = Object.fromEntries(formData.entries());
  console.log("Test: " + JSON.stringify(expenses));

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(expenses),
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
