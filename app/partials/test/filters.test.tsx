import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import {
  AmountFilter,
  CategoryFilter,
  DateFilter,
  SearchFilter,
} from "../filters";

test("Date filter can be hidden", () => {
  render(<DateFilter visible={false}></DateFilter>);
  const startDateFields = screen.queryAllByLabelText("Start Date");
  const endDateFields = screen.queryAllByLabelText("End Date");

  expect(startDateFields.length).toBe(0);
  expect(endDateFields.length).toBe(0);
});

test("Date filter includes Start and End Date fields", () => {
  render(<DateFilter visible></DateFilter>);
  const startDate = screen.getByLabelText("Start Date");
  const endDate = screen.getByLabelText("End Date");

  expect(startDate.localName).toEqual("input");
  expect(endDate.localName).toEqual("input");
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
