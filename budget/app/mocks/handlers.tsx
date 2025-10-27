import { http, HttpResponse } from "msw";
import { createTestRow } from "./data";

const mockSingleResponse = { "Rows Added": 1 };
const mockMultipleResponse = { "Rows Added": 2 };
const mockTransactionView = createTestRow(
  "2000-1-01",
  "123.45",
  "First National Test",
  "Other",
  "",
  "TEST",
);

export const handlers = [
  http.post("http://localhost:8080/expense/add", () => {
    return HttpResponse.json(mockSingleResponse);
  }),
  http.post("http://localhost:8080/expense/bulkadd", () => {
    return HttpResponse.json(mockMultipleResponse);
  }),
  http.get("http://localhost:8080/expense/date", () => {
    return HttpResponse.json(mockTransactionView);
  }),
];
