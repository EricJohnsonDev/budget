import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import {
  AmountFilter,
  CategoryFilter,
  DateFilter,
  SearchFilter,
} from "../filters";

afterEach(() => {
  cleanup();
});

test("Date filter can be hidden", () => {
  render(<DateFilter visible={false}></DateFilter>);
  const startDateFields = screen.queryAllByLabelText("Start Date");
  const endDateFields = screen.queryAllByLabelText("End Date");

  expect(startDateFields.length).toBe(0);
  expect(endDateFields.length).toBe(0);
});

test("Date filter includes Start and End fields", () => {
  render(<DateFilter visible></DateFilter>);
  const startDate = screen.getAllByLabelText("Start Date");
  const endDate = screen.getAllByLabelText("End Date");

  // Label above the input, and the input itself
  expect(startDate.length).toBe(2);
  expect(startDate[0].textContent).toMatch(/.*Start Date/);

  expect(endDate.length).toBe(2);
  expect(endDate[0].textContent).toMatch(/.*End Date/);
});

test("Search filter is not implemented", () => {
  render(<SearchFilter visible></SearchFilter>);
  const filterNode = screen.getByTestId("searchFilter");
  expect(filterNode.textContent).toEqual("search filter is not implemented");
});

test("Category filter is not implemented", () => {
  render(<CategoryFilter visible></CategoryFilter>);
  const filterNode = screen.getByTestId("categoryFilter");
  expect(filterNode.textContent).toEqual("category filter is not implemented");
});

test("Amount filter is not implemented", () => {
  render(<AmountFilter visible></AmountFilter>);
  const filterNode = screen.getByTestId("amountFilter");
  expect(filterNode.textContent).toEqual("amount filter is not implemented");
});
