import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, afterEach, vi, beforeAll, afterAll } from "vitest";
import Add from "../add";

afterEach(() => {
  cleanup();
});

test("Manually entering a transaction yields a successful response", async () => {
  const user = userEvent.setup();
  const consoleMock = vi
    .spyOn(console, "log")
    .mockImplementation(() => undefined);
  render(<Add></Add>);

  const addSingleTransactionButton = screen.getByText("Add transaction(s)");
  await user.click(addSingleTransactionButton);

  // No real implementation to test, so checking console
  expect(consoleMock).toHaveBeenCalledOnce();
  expect(consoleMock).toHaveBeenCalledWith({ "Rows Added": 1 });
});

test("Entering multiple transactions via .csv yields a successful response", async () => {
  const user = userEvent.setup();
  const consoleMock = vi
    .spyOn(console, "log")
    .mockImplementation(() => undefined);
  render(<Add></Add>);

  const file = new File([""], "uploadTest.csv");
  const uploadCsvTransactionsButton = screen.getByText("Upload .csv");

  fireEvent.change(uploadCsvTransactionsButton.children[1], {
    target: { files: [file] },
  });

  
  // No real implementation to test, so checking console
  await waitFor(() => {
    expect(consoleMock).toHaveBeenCalledOnce();
    expect(consoleMock).toHaveBeenCalledWith({ "Rows Added": 2 });
  });
});
