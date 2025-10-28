import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, afterEach, vi, beforeAll, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import Home from "../home";

const mockResponse = [
  {
    Date: "2000-01-01",
    Amount: "$29.42",
    Institution: "First National Test",
    Category: "Other",
    Comment: "",
  },
];

export const restHandlers = [
  http.get("http://localhost:8080/expense/date", () => {
    return HttpResponse.json(mockResponse);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => {
  // Reset handlers after each test for test isolation
  server.resetHandlers();
  cleanup();
});

test("Total expenses shows expected value", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const searchButton = screen.getByTestId("searchButton");
  const total_expenses = screen.getByText("Total Expenses", {
    exact: false,
  }).innerHTML;

  await user.click(searchButton);

  waitFor(() => {
    expect(total_expenses).toEqual("Total Expenses: 29.42");
  });
});

test("Date filter is the only one selected by default", () => {
  render(<Home></Home>);

  const dateFilterButton = screen.getByLabelText("date filter");
  const categoryFilterButton = screen.getByLabelText("category filter");
  const amountFilterButton = screen.getByLabelText("amount filter");
  const searchFilterButton = screen.getByLabelText("search filter");

  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("true");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Category filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const categoryFilterButton = screen.getByLabelText("category filter");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Amount filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const amountFilterButton = screen.getByLabelText("amount filter");
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(amountFilterButton);
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(amountFilterButton);
  expect(amountFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("Search filter can be selected and unselected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const searchFilterButton = screen.getByLabelText("search filter");
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(searchFilterButton);
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(searchFilterButton);
  expect(searchFilterButton.getAttribute("aria-pressed")).toEqual("false");
});

test("At least one filter must be selected", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const dateFilterButton = screen.getByLabelText("date filter");
  const categoryFilterButton = screen.getByLabelText("category filter");

  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("true");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("false");

  await user.click(dateFilterButton);
  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("true");

  // Switch to a non-default button to help guard against a false positive
  await user.click(categoryFilterButton);
  await user.click(dateFilterButton);

  expect(dateFilterButton.getAttribute("aria-pressed")).toEqual("false");
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("true");

  await user.click(categoryFilterButton);
  expect(categoryFilterButton.getAttribute("aria-pressed")).toEqual("true");
});

test("Button to clear table results only appears when table has data", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);
  const searchButton = screen.getByText("search");
  const clearResultsButton = screen.getByText("Clear results");
  const viewTable = screen.queryByTestId("viewTableOuterBox");

  expect(clearResultsButton.hidden).toBe(true);

  await user.click(searchButton);

  expect(clearResultsButton.hidden).toBe(false);

  waitFor(() => {
    expect(viewTable).not.toBeNull();
  });

  await user.click(clearResultsButton);

  expect(clearResultsButton.hidden).toBe(true);
  expect(viewTable).toBeNull();
});

test("View table appears when results return from search", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);
  const searchButton = screen.getByText("search");
  const viewTable = screen.queryByTestId("viewTableOuterBox");

  expect(viewTable).toBeNull();

  await user.click(searchButton);

  waitFor(() => {
    expect(viewTable).not.toBeNull();
    expect(viewTable?.getAttribute("hidden")).toBe("false");
  });
});
