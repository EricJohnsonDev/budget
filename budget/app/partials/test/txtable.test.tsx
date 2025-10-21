import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, afterEach } from "vitest";
import ViewTable from "../txtable";

afterEach(() => {
  cleanup();
});

const createTestRow = (
  date: string,
  amount: string,
  institution: string,
  category: string,
  subcategory: string,
  comment: string,
) => {
  return {
    Date: date,
    Amount: amount,
    Institution: institution,
    Category: category,
    Subcategory: subcategory,
    Comment: comment,
  };
};

const createIncrementalTestRows = (
  count: number,
  date: string,
  amount: string,
  institution: string,
  category: string,
  subcategory: string,
  comment: string,
) => {
  let result = [];

  for (let i = 0; i < count; i++) {
    let d = new Date(date);
    d.setDate(d.getDate() + i);
    let newDate = formatDate(d.getFullYear(), d.getMonth(), d.getDate());

    let amt = Number(amount) + i;

    result.push(
      createTestRow(
        newDate,
        String(amt.toFixed(2)),
        institution,
        category,
        subcategory,
        comment,
      ),
    );
  }

  return result;
};

const formatDate = (year: number, month: number, day: number) => {
  const fMonth = ("0" + (month + 1)).slice(-2);
  const fDay = ("0" + day).slice(-2);

  return year + "-" + fMonth + "-" + fDay;
};

test("Single expense can be viewed in table", () => {
  // Note: The date conversion gets a bit funky if the month has a leading zero, so it's omitted
  const testRows = createIncrementalTestRows(
    1,
    "2000-1-01",
    "100.00",
    "First National Test",
    "Other",
    "Test",
    "Test expense from txtable test suite",
  );

  render(<ViewTable rows={testRows}></ViewTable>);

  const colHeaders = screen.getAllByRole("columnheader");
  expect(colHeaders.length).toBe(6);
  expect(colHeaders[0].innerHTML).toEqual("Date");
  expect(colHeaders[1].innerHTML).toEqual("Amount");
  expect(colHeaders[2].innerHTML).toEqual("Institution");
  expect(colHeaders[3].innerHTML).toEqual("Category");
  expect(colHeaders[4].innerHTML).toEqual("Subcategory");
  expect(colHeaders[5].innerHTML).toEqual("Comment");

  const rows = screen.getAllByRole("row");
  // Length is 2 b/c this includes column headers
  expect(rows.length).toEqual(2);
  // Each data value is a child
  expect(rows[1].children.length).toBe(6);

  expect(rows[1].children[0].innerHTML).toEqual("2000-01-01");
  expect(rows[1].children[1].innerHTML).toEqual("100.00");
  expect(rows[1].children[2].innerHTML).toEqual("First National Test");
  expect(rows[1].children[3].innerHTML).toEqual("Other");
  expect(rows[1].children[4].innerHTML).toEqual("Test");
  expect(rows[1].children[5].innerHTML).toEqual(
    "Test expense from txtable test suite",
  );
});

test("Multiple expenses are truncated by pagination", async () => {
  const numTotalRows = 6;
  const testRows = createIncrementalTestRows(
    numTotalRows,
    "2000-1-01",
    "100.00",
    "First National Test",
    "Other",
    "Test",
    "Test expense from txtable test suite",
  );

  render(<ViewTable rows={testRows}></ViewTable>);

  let rows = screen.getAllByRole("row");
  // Length includes column headers, so our first 5 rows plus 1
  expect(rows.length).toEqual(6);

  // The dash used by MUI TablePagination is U+2013, compared to the more standard U+002d
  let paginationDisplayedRows = screen.queryAllByText(`1–5 of ${numTotalRows}`);
  expect(paginationDisplayedRows.length).toBe(2);
});

test("Multiple expenses are navigable across multiple pages", async () => {
  const numTotalRows = 7;
  const testRows = createIncrementalTestRows(
    numTotalRows,
    "2000-1-01",
    "100.00",
    "First National Test",
    "Other",
    "Test",
    "Test expense from txtable test suite",
  );

  const user = userEvent.setup();
  render(<ViewTable rows={testRows}></ViewTable>);

  let rows = screen.getAllByRole("row");
  // Length includes column headers, so our first 5 rows plus 1
  expect(rows.length).toEqual(6);

  const paginationNextPage = screen.queryAllByRole("button", {
    name: "Go to next page",
  });
  expect(paginationNextPage.length).toBe(2);

  await user.click(paginationNextPage[0]);

  rows = screen.getAllByRole("row");
  expect(rows.length).toEqual(3);
});

test("Rows per page can be updated appropriately", async () => {
  const numTotalRows = 8;
  const testRows = createIncrementalTestRows(
    numTotalRows,
    "2000-1-01",
    "100.00",
    "First National Test",
    "Other",
    "Test",
    "Test expense from txtable test suite",
  );

  const user = userEvent.setup();
  render(<ViewTable rows={testRows}></ViewTable>);

  let rows = screen.getAllByRole("row");
  // Length includes column headers, so our first 5 rows plus 1
  expect(rows.length).toBe(6);

  const rowsPerPageSelector = screen.queryAllByRole("combobox");
  expect(rowsPerPageSelector.length).toBe(2);

  await user.click(rowsPerPageSelector[0]);

  const rowsPerPageOptions = screen.queryAllByRole("option");
  expect(rowsPerPageOptions.length).toBe(3);

  await user.click(rowsPerPageOptions[1]);

  rows = screen.getAllByRole("row");
  expect(rows.length).toBe(numTotalRows + 1);
});
