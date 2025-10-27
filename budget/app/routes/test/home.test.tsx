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

vi.mock("@/expense/date", () => ({
  updateData: vi.fn().mockResolvedValue({ mockResponse }),
}));

test("Total expenses shows expected value", async () => {
  const user = userEvent.setup();
  render(<Home></Home>);

  const searchButton = screen.getByRole("button");
  const total_expenses = screen.getByText("Total Expenses", {
    exact: false,
  }).innerHTML;

  await user.click(searchButton);

  waitFor(() => {
    expect(total_expenses).toEqual("Total Expenses: 29.42");
  });
});
