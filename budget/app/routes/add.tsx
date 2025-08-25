import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import { TextField } from "@mui/material";
import type { Route } from "./+types/home";
import type { Tx_expenses } from "../partials/models";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | Add" },
    { name: "add", content: "Add transactions" },
  ];
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Add() {
  return (
    <Box>
      <form action={addSingleExpense}>
        <Button type="submit" variant="contained">
          Add transaction(s)
        </Button>
        <section>
          <TextField
            name="Date"
            label="Date"
            helperText="MM-dd-yyyy"
          ></TextField>
          <TextField name="Amount" label="Amount" helperText="$USD"></TextField>
          <TextField
            name="Institution"
            label="Institution"
            helperText=" "
          ></TextField>
          <TextField
            name="Category"
            label="Category"
            helperText=" "
          ></TextField>
          <TextField
            name="Subcategory"
            label="Subcategory"
            helperText=" "
          ></TextField>
          <TextField name="Comment" label="Comment" helperText=" "></TextField>
        </section>
      </form>
      <form>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload .csv
        <VisuallyHiddenInput
          type="file"
          accept=".csv"
          onChange={(event) => parseCsv(event.target.files)}
          multiple
        />
      </Button>
    </form>
    </Box>
  );
}

async function addSingleExpense(formData: FormData) {
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

async function addMultipleExpenses(expenses: Tx_expenses[]) {
const url = `http://localhost:8080/expense/bulkadd`;

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

async function parseCsv(files: FileList) {
  const reader = new FileReader();
  let result = "";

  reader.onload = () => {
    result += reader.result;
    console.log("Result in onload: ", result);
    parseCsvToExpenses(result);
  };
  reader.onerror = () => {
    console.log("Error reading the file.");
  };

  for (let i = 0; i < files.length; i++) {
    reader.readAsText(files[i]);
  }

  console.log("Result at end of function: ", result);
}

function parseCsvToExpenses(csvStr: string) {
    let expenses = [];

  let csvArray = csvStr.split("\r\n").map((row) => {
    return row.split(",");
  });

for (let i = 1; i < csvArray.length; i++) {
    let newExpense: Tx_expenses = {
        Date: csvArray[i][0],
        Amount: csvArray[i][1],
        Institution: csvArray[i][2],
        Category: csvArray[i][3],
        Subcategory: csvArray[i][4],
        Comment: csvArray[i][5]
    }

    expenses.push(newExpense);
}

  console.log("Parsed csv as array: ", csvArray);
  console.log("expenses: ", JSON.stringify(expenses));
  addMultipleExpenses(expenses);
}
